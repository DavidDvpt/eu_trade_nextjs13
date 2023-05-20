import { TransactionExtended } from '@/app/extendedAppTypes';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';

export const fetchTransactions = async (params: IFetchTransactionsParams) => {
  try {
    const { sellStatus, transactionType, itemId, limit, order, sortKey } =
      params;
    const url = itemId
      ? `/api/items/${itemId}/transactions`
      : '/api/transactions';

    const response = await fetchDatas<TransactionExtended>(url, {
      params: { sellStatus, transactionType, limit, order, sortKey },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
