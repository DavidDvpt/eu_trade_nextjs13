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
      include: { resource: true },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getTransactionsBenefit(userId: string) {
  try {
    const result: TransactionBenefitResult = {
      buy: 0,
      feeLost: 0,
      sellBenefit: 0,
      total: 0,
    };
    const response = await getTransactions({
      userId,
    });

    response.forEach((t) => {
      const b = t.value - t.resource.value * t.quantity;

      if (t.type === 'BUY') {
        result.buy += b;
      } else {
        if (t.sellStatus === 'RETURNED') {
          result.feeLost += t.fee ?? 0;
        } else {
          result.sellBenefit += b - (t.fee ?? 0);
        }
      }
    });

    result.total = result.buy - result.feeLost - result.sellBenefit;
    console.log('prisma', result);

    return result;
  } catch (error) {
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
export async function getStockByResourceId(resourceId: string | null) {
  try {
    if (resourceId) {
      const response = await client.transaction.groupBy({
        by: ['type', 'sellStatus', 'resourceId'],
        _sum: {
          quantity: true,
        },
        where: { resourceId },
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
    console.log(error);
    return Promise.reject(error);
  }
}
