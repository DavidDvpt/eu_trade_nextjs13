import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTransactionState, transactionActions } from './transactionSlice';
import { fetchTransactionsThunk } from './transactionThunks';

interface IUseTransactions extends IFetchTransactionsParams {
  all?: boolean;
}
const useTransactions = ({
  itemId,
  type,
  sellStatus,
  all,
}: IUseTransactions) => {
  const { transactions } = useAppSelector(getTransactionState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemId || all) {
      dispatch(fetchTransactionsThunk({ itemId, type, sellStatus }));
    }
  }, [itemId, all]);

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
