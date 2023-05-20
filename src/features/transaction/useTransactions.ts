import { TransactionsExtended } from '@/app/extendedAppTypes';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { useState } from 'react';
import { fetchTransactions } from './transactionRequest';

interface IUseTransactions extends IFetchTransactionsParams {
  all?: boolean;
}
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

  const loadTransactions = ({
    itemId,
    transactionType,
    sellStatus,
    sortKey,
    limit,
    order,
  }: IFetchTransactionsParams) => {
    setApiState({ status: ApiStatusEnum.PENDING, error: null });
    request({ itemId, transactionType, sellStatus, limit, order, sortKey });
  };

  return {
    loadTransactions,
    transactions,
    apiState,
    transactionsCount: transactions?.length ?? 0,
  };
};

export default useTransactions;
