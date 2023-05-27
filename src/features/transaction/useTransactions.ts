import { TransactionsExtended } from '@/app/extendedAppTypes';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { SellStatus, TransactionType } from '@prisma/client';
import { useState } from 'react';
import {
  createTransactionAsync,
  fetchTransactions,
} from './transactionRequest';

const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionsExtended | null>(
    null
  );
  const [apiState, setApiState] = useState<{
    status: ApiStatusEnum;
    error: any;
  }>({ status: ApiStatusEnum.IDLE, error: null });

  const request = async (params: IFetchTransactionsParams) => {
    try {
      if (apiState.status !== ApiStatusEnum.PENDING) {
        const t = await fetchTransactions(params);
        setApiState({ status: ApiStatusEnum.IDLE, error: null });
        setTransactions(t);
      }
    } catch (error) {
      setApiState({ status: ApiStatusEnum.REJECTED, error });
    }
  };

  const loadTransactions = async ({
    itemId,
    transactionType,
    sellStatus,
    sortKey,
    limit,
    order,
  }: IFetchTransactionsParams) => {
    try {
      if (apiState.status !== ApiStatusEnum.PENDING) {
        setApiState({ status: ApiStatusEnum.PENDING, error: null });
        const t = await fetchTransactions({
          itemId,
          transactionType,
          sellStatus,
          limit,
          order,
          sortKey,
        });
        setApiState({ status: ApiStatusEnum.IDLE, error: null });
        setTransactions(t);
      }
    } catch (error) {
      setApiState({ status: ApiStatusEnum.REJECTED, error });
    }
  };

  const createTransaction = async (
    body: TransactionFormType & {
      type: TransactionType;
      sellStatus: SellStatus | null;
    }
  ) => {
    try {
      if (apiState.status !== ApiStatusEnum.PENDING) {
        setApiState({ status: ApiStatusEnum.PENDING, error: null });
        await createTransactionAsync({ body });
        setApiState({ status: ApiStatusEnum.IDLE, error: null });
      }
    } catch (error) {
      setApiState({ status: ApiStatusEnum.REJECTED, error });
    }
  };

  return {
    loadTransactions,
    createTransaction,
    transactions,
    apiState,
    transactionsCount: transactions?.length ?? 0,
  };
};

export default useTransactions;
