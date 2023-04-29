import { TransactionExtended } from '@/app/extendedAppTypes';
import { Transaction } from '@prisma/client';
import axios from 'axios';
import {
  fetchDatas,
  fetchSingleData,
  postEntity,
  updateEntity,
} from './genericRequests';

export async function fetchTransactionsProfit() {
  try {
    const response = await fetchSingleData<TransactionBenefitResult>(
      '/api/transaction/profit'
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function fetchStock() {
  try {
    const stocks = await fetchDatas<IStock>(`/api/transaction/stock`);

    return stocks;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function fetchStockByResourceId(resourceId: string | null) {
  try {
    if (resourceId) {
      const response = await axios.get<{ data: number }>(
        `/api/resource/${resourceId}/stock`
      );

      return response.data.data ?? 0;
    } else {
      return Promise.reject({ status: 422, message: 'param missing' });
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
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
export async function updateTransaction(transaction: TransactionExtended) {
  try {
    const response = await updateEntity({
      url: `/api/transaction/${transaction.id}`,
      body: transaction,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
