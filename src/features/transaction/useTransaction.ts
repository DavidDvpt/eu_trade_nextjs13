import {
  TransactionExtended,
  TransactionsExtended,
} from '@/app/extendedAppTypes';
import {
  fetchDatas,
  postEntity,
  updateEntity,
} from '@/lib/axios/requests/genericRequests';
import { SellStatus } from '@prisma/client';
import { useEffect, useState } from 'react';

interface IUseTransactions extends IFetchTransactionsParams {
  all?: boolean;
}
const useTransactions = ({
  resourceId,
  type,
  sellStatus,
  all,
}: IUseTransactions) => {
  const [transactions, setTransactions] = useState<TransactionsExtended | null>(
    null
  );

  const fetchTransactions = async () => {
    try {
      let url = '/api/transaction';

      if (resourceId) {
        //fetch only one resource
        url = `/api/resource/${resourceId}/transactions`;
      }

      const response = await fetchDatas<TransactionExtended>(url, {
        params: { sellStatus, type },
      });

      setTransactions(response);
    } catch (error) {}
  };
  const fetchLastTransaction = async (resourceId: string) => {
    try {
      const transac = await fetchDatas<TransactionExtended>(
        `/api/resource/${resourceId}/transactions`,
        {
          params: {
            limit: 1,
            sortKey: 'createdAt',
            order: 'desc',
            sellStatus: SellStatus.ENDED,
          },
        }
      );

      return setTransactions(transac);
    } catch (error) {
      Promise.reject(error);
    }
  };
  const updateTransaction = async (transaction: TransactionExtended) => {
    try {
      const response = await updateEntity({
        url: `/api/transaction/${transaction.id}`,
        body: transaction,
      });
      if (transactions) {
        setTransactions(transactions?.filter((f) => f.id !== transaction.id));
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  useEffect(() => {
    if (resourceId || all) {
      fetchTransactions();
    }
  }, [resourceId, all]);

  const createTransaction = async (body: PostTransactionBody) => {
    try {
      const r = await await postEntity({ url: '/api/transaction', body });
    } catch (error) {}
  };

  return {
    transactions: transactions,
    transactionsCount: transactions?.length ?? 0,
    lastSoldTransaction: fetchLastTransaction,
    createTransaction,
    updateTransaction,
  };
};

export default useTransactions;
