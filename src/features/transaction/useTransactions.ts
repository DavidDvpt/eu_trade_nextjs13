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
  const [apiState, setSetApiState] = useState<{
    status: ApiStatusEnum;
    error: any;
  }>({ status: ApiStatusEnum.IDLE, error: null });

  const request = async (params: IFetchTransactionsParams) => {
    try {
      const t = await fetchTransactions(params);
      setSetApiState({ status: ApiStatusEnum.IDLE, error: null });
      setTransactions(t);
    } catch (error) {
      setSetApiState({ status: ApiStatusEnum.REJECTED, error });
    }
  };

  const loadTransactions = ({
    itemId,
    transactionType,
    sellStatus,
    limit,
    order,
  }: IFetchTransactionsParams) => {
    setSetApiState({ status: ApiStatusEnum.PENDING, error: null });
    request({ itemId, transactionType, sellStatus, limit, order });
  };

  return {
    loadTransactions,
    transactions,
    apiState,
    transactionsCount: transactions?.length ?? 0,
  };
};

export default useTransactions;
