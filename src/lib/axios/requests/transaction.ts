import { Transaction } from '@prisma/client';
import { postEntity } from './genericRequests';

export async function createTransaction(body: any) {
  try {
    const response = await postEntity<Transaction>({
      url: '/api/transaction',
      body,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
