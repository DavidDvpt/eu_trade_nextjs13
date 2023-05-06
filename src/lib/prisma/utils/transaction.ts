import { TransactionsExtended } from '@/app/extendedAppTypes';
import { SellStatus, Transaction, TransactionType } from '@prisma/client';
import client from '../../../../prisma/prismadb';

export async function getTransactions(params: {
  userId: string;
  transactionType?: TransactionType;
  resourceId?: string;
  sellStatus?: SellStatus;
  sortKey?: keyof Transaction;
  order?: sortOrder;
  limit?: number;
}) {
  try {
    let request: any = {
      where: {
        sellStatus: params?.sellStatus ?? undefined,
        type: params?.transactionType ?? undefined,
        userId: params.userId,
        resourceId: params.resourceId,
      },
      include: { resource: true },
    };
    if (params.sortKey)
      request = {
        ...request,
        orderBy: [{ [params.sortKey]: params.order ?? 'asc' }],
      };

    const response = (await client.transaction.findMany({
      ...request,
      take: params.limit,
    })) as TransactionsExtended;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getTransactionsByResourceId(
  userId: string,
  resourceId: string,
  type?: TransactionType
) {
  try {
    const transactions = await client.transaction.findMany({
      where: {
        userId,
        resourceId,
        type: type,
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
export async function getStock(userId: string) {
  try {
    const response = await client.transaction.groupBy({
      by: ['resourceId', 'type', 'sellStatus'],
      _sum: { quantity: true },
      orderBy: { resourceId: 'asc' },
      where: { userId },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getStockByResourceId(
  userId: string,
  resourceId: string | null
) {
  try {
    if (resourceId) {
      const response = await client.transaction.groupBy({
        by: ['type', 'sellStatus', 'resourceId'],
        _sum: {
          quantity: true,
        },
        where: { resourceId, userId },
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
export async function postTransaction(
  data: PostTransactionBody & { userId: string }
) {
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
        resourceId: data.resourceId,
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
