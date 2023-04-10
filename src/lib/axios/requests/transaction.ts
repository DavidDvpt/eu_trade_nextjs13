import { TransactionExtended } from '@/app/extendedAppTypes';
import { SellStatus, Transaction, TransactionType } from '@prisma/client';
import axios from 'axios';
import { fetchDatas, postEntity, updateEntity } from './genericRequests';

interface IfetchTransactionsByResourceIdProps {
  id?: string;
  type?: 'BUY' | 'SELL' | 'MINING';
}

export async function fetchTransactions({
  sellStatus,
  transactionType,
}: {
  sellStatus?: SellStatus;
  transactionType?: TransactionType;
}) {
  try {
    const response = await fetchDatas<TransactionExtended>('/api/transaction', {
      params: { sellStatus, transactionType },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function fetchTransactionsByResourceId({
  id,
  type,
}: IfetchTransactionsByResourceIdProps) {
  try {
    if (id) {
      const response = await fetchDatas<Transaction>(
        `/api/resource/${id}/transactions`,
        { params: { type } }
      );
      return response;
    } else {
      return [];
    }
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

      return response.data.data;
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
