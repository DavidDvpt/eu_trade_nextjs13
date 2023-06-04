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
  await getTransactions('SELL').then(async (response) => {
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
    console.log(result);
  });
};

const createBuyTransaction = async () => {
  await getTransactions('BUY').then(async (response) => {
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
  });
};

createSellTransactions();
createBuyTransaction();
