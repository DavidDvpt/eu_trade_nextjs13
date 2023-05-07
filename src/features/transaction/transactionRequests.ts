import { TransactionExtended } from '@/app/extendedAppTypes';
import {
  fetchDatas,
  postEntity,
  updateEntity,
} from '@/lib/axios/requests/genericRequests';
import { Transaction } from '@prisma/client';

export async function fetchTransactionsRequest(
  params: IFetchTransactionsParams
) {
  const { resourceId } = params;
  try {
    let url = '/api/transaction';

    if (resourceId) {
      //fetch only one resource
      url = `/api/resource/${resourceId}/transactions`;
    }

    const response = await fetchDatas<TransactionExtended>(url, {
      params,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function postTransactionRequest(body: PostTransactionBody) {
  try {
    const r = await postEntity<Transaction>({ url: '/api/transaction', body });

    return r;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function updateTransactionRequest(
  transaction: TransactionExtended
) {
  try {
    const response = await updateEntity<TransactionExtended>({
      url: `/api/transaction/${transaction.id}`,
      body: transaction,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
