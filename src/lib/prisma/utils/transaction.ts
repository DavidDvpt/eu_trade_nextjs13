import { SellStatus, Transaction, TransactionType } from '@prisma/client';
import client from '../../../../prisma/prismadb';

export async function getTransactions(params: {
  sellStatus?: SellStatus;
  transactionType?: TransactionType;
  userId: string;
}) {
  try {
    const response = await client.transaction.findMany({
      where: {
        sellStatus: params?.sellStatus ?? undefined,
        type: params?.transactionType ?? undefined,
        userId: params.userId,
      },
      include: { item: true },
      orderBy: [{ createdAt: 'asc' }],
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getTransaction(
  userId: string,
  itemId: string,
  type?: TransactionType
) {
  try {
    const transactions = await client.transaction.findMany({
      where: {
        userId,
        itemId,
        type: type,
      },
      include: {
        item: true,
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
        type: data.type,
        quantity: data.quantity,
        itemId: data.itemId,
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
export async function putTransaction(data: Transaction) {
  try {
    const transaction = await client.transaction.update({
      where: { id: data.id },
      data: {
        type: data.type,
        quantity: data.quantity,
        itemId: data.itemId,
        userId: data.userId,
        value: data.value,
        sellStatus: data.sellStatus,
        fee: data.fee,
        modifiedAt: new Date().toISOString(),
      },
    });

    return transaction;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getStocks(userId: string) {
  try {
    const response = await client.transaction.groupBy({
      by: ['itemId', 'type', 'sellStatus'],
      _sum: { quantity: true },
      orderBy: { itemId: 'asc' },
      where: { userId },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getStock(userId: string, itemId: string | null) {
  try {
    if (itemId) {
      const response = await client.transaction.groupBy({
        by: ['type', 'sellStatus', 'itemId'],
        _sum: {
          quantity: true,
        },
        where: { itemId, userId },
      });

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
