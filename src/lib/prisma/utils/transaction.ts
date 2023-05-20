import { Transaction } from '@prisma/client';
import client from '../../../../prisma/prismadb';

export async function getTransactions(
  params: IFetchTransactionsParams & {
    userId: string;
  }
) {
  try {
    const sort = params.sortKey
      ? [{ [params.sortKey]: params.order }]
      : undefined;

    const response = await client.transaction.findMany({
      where: {
        userId: params.userId,
        itemId: params.itemId,
        type: params?.transactionType ?? undefined,
        sellStatus: params?.sellStatus ?? undefined,
      },
      include: { item: true },
      orderBy: sort,
      take: params.limit,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
// export async function getTransaction(
//   userId: string,
//   itemId: string,
//   type?: TransactionType,
//   order?: Order,
//   limit?: number
// ) {
//   try {
//     const transactions = await client.transaction.findMany({
//       where: {
//         userId,
//         itemId,
//         type: type,
//       },
//       include: {
//         item: true,
//       },
//       orderBy: [{ createdAt: order }],
//       take: limit,
//     });

//     return transactions;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
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
    const response: DbUserStocks = await client.$queryRaw`
      SELECT i.id itemId,i.name itemName,i.value itemValue, t.type transactionType, t.sellStatus sellStatus, COUNT(*) count,SUM(t.quantity) quantity, SUM(t.fee) fee, SUM(t.value) totalValue FROM Transaction t
      LEFT JOIN Item i
      ON t.itemId = i.id
      WHERE t.userId = ${userId}
      GROUP BY i.id, t.type, t.sellStatus
      ORDER BY i.name, t.type, t.sellStatus
    `;

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
