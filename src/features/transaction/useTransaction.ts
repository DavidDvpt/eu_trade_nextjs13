import {
  TransactionExtended,
  TransactionsExtended,
} from '@/app/extendedAppTypes';
import { fetchDatas, postEntity } from '@/lib/axios/requests/genericRequests';
import { SellStatus } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { transactionActions } from './transactionSlice';
import { fetchTransactionsThunk } from './transactionThunks';

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resourceId || all) {
      dispatch(fetchTransactionsThunk({ resourceId, type, sellStatus }));
    }
  }, [resourceId, all]);

  useEffect(() => {
    return () => {
      dispatch(transactionActions.reset());
    };
  }, []);

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
  };
};

export default useTransactions;
