import client from '../prismadb';

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
  console.log(data);
  try {
    const transaction = await client.transaction.create({
      data: {
        id: data.id,
        type: data.transactionType,
        quantity: data.quantity,
        resourceId: data.resourceId,
        userId: data.userId,
        value: data.buyValue,
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
