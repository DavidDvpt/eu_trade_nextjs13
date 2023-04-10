import { SellStatus, TransactionType } from '@prisma/client';
import client from '../prismadb';

export async function getTransactions(params: {
  sellStatus?: SellStatus;
  transactionType?: TransactionType;
}) {
  try {
    const response = await client.transaction.findMany({
      where: {
        sellStatus: params?.sellStatus ?? undefined,
        type: params?.transactionType ?? undefined,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function getTransactionsByResourceId(
  id: string,
  type?: 'BUY' | 'SELL' | 'MINING'
) {
  try {
    const transactions = client.transaction.findMany({
      where: {
        resourceId: id,
        type: type ?? undefined,
      },
      include: {
        resource: true,
      },
    });

    return transactions;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function postTransaction(data: any) {
  try {
    const transaction = await client.transaction.create({
      data: {
        type: data.transactionType,
        quantity: data.quantity,
        resourceId: data.resourceId,
        userId: data.userId,
        value: data.value,
        sellStatus: data.sellStatus,
        fee: data.fee,
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
export async function getStockByResourceId(resourceId: string | null) {
  try {
    console.log('resourceId', resourceId);
    if (resourceId) {
      const response = await client.transaction.groupBy({
        by: ['type', 'sellStatus', 'resourceId'],
        _sum: {
          quantity: true,
        },
        where: { resourceId },
      });
      console.log('stock', response);
      let stock = 0;
      response.forEach((e) => {
        if (e.type === 'BUY') {
          stock += e._sum.quantity ?? 0;
        }
        if (e.type === 'SELL' && e.sellStatus !== 'RETURNED') {
          stock -= e._sum.quantity ?? 0;
        }
      });

      return stock;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
