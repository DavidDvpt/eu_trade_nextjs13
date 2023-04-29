import { TransactionExtended } from '@/app/extendedAppTypes';
import { fetchDatas, fetchSingleData, updateEntity } from './genericRequests';

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
