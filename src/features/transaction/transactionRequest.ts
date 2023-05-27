import { TransactionExtended } from '@/app/extendedAppTypes';
import { fetchDatas, postEntity } from '@/lib/axios/requests/genericRequests';
import { SellStatus, TransactionType } from '@prisma/client';

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
export const createTransactionAsync = async (params: {
  body: TransactionFormType & {
    type: TransactionType;
    sellStatus: SellStatus | null;
  };
}) => {
  try {
    const { body } = params;
    const response = await postEntity<TransactionExtended>({
      url: '/api/transactions',
      body,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
