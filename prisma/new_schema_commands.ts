import { getDistinctValues } from '@/lib/arrayTools';
import {
  SellStatus,
  SessionContext,
  SessionState,
  TransactionType,
} from '@prisma/client';
import client from './prismadb';

const getTransactions = async (type: TransactionType) => {
  const buys = await client.transaction.findMany({ where: { type } });
  console.table(buys);

  return buys;
};

const createSellTransactions = async () => {
  try {
    return await getTransactions('SELL').then(async (response) => {
      const result = await client.sell.createMany({
        data: response.map((m) => {
          return {
            itemId: m.itemId,
            quantity: m.quantity,
            createdAt: m.createdAt,
            updatedAt: m.modifiedAt,
            status: m.sellStatus as SellStatus,
            userId: m.userId,
            value: m.value,
            fee: m.fee,
          };
        }),
      });
      console.log('sell', result);
      return true;
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
const createBuyTransaction = async () => {
  try {
    return await getTransactions('BUY').then(async (response) => {
      for (let i = 0; i < response.length; i++) {
        const element = response[i];

        await client.session.create({
          data: {
            context: SessionContext.TRADE,
            state: SessionState.OPEN,
            createdAt: element.createdAt,
            updatedAt: element.modifiedAt,
            SessionRows: {
              create: {
                createdAt: element.createdAt,
                updatedAt: element.modifiedAt,
                itemId: element.itemId,
                quantity: element.quantity,
                fee: element.fee,
                value: element.value,
              },
            },
          },
        });
      }

      console.log('buy', response.length);
      return true;
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

Promise.all([createSellTransactions(), createBuyTransaction()]).then(
  (response) => {
    const createJunctions = async () => {
      const sessions = await client.session.findMany({
        include: { SessionRows: true },
      });
      const sells = await client.sell.findMany();
      const distinctSellItemId = getDistinctValues(sells.map((m) => m.itemId));
    };
  }
);
