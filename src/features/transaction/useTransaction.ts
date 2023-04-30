import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTransactionState, transactionActions } from './transactionSlice';
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
  const { transactions } = useAppSelector(getTransactionState);
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

  return {
    transactions: transactions.result,
    transactionsCount: transactions.result?.length ?? 0,
  };
};

export default useTransactions;
