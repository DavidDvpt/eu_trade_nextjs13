import client from '../prismadb';

export async function postTransaction(data: any) {
  try {
    const transaction = await client.transaction.create({
      data: {
        id: data.id,
        type: data.transactionType,
        quantity: data.quantity,
        resourceId: data.resourceId,
        userId: data.userId,
      },
    });

    return transaction;
  } catch (error) {
    return Promise.reject(error);
  }
}
