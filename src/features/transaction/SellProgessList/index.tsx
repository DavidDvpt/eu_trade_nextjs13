import { ReloadActionEnum } from '@/features/global/globalEnums';
import { getGlobalState, globalActions } from '@/features/global/globalSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import useTransactions from '@/features/transaction/useTransactions';
import { SellStatus, TransactionType } from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import SellProgessTable from './SellProgessTable';
import styles from './sellProgressList.module.scss';

function SellProgessList(): React.ReactElement {
  const NAME = ReloadActionEnum.RELOAD_SELL_PROGRESS_TRANSACTION_LIST;
  const { reload } = useAppSelector(getGlobalState);
  const { transactions, loadTransactions } = useTransactions();
  const dispatch = useAppDispatch();
  const request = () => {
    loadTransactions({
      transactionType: TransactionType.SELL,
      sellStatus: SellStatus.PROGRESS,
    });
  };

  useEffect(() => {
    if (reload.includes(NAME)) {
      request();
      dispatch(globalActions.removeReload(NAME));
    }
  }, [reload]);

  useEffect(() => {
    request();
  }, []);

  return (
    <section className={styles.sellProgressList}>
      <h4>Ventes en cours</h4>
      {!isEmpty(transactions) ? (
        <SellProgessTable
          rows={transactions ?? []}
          toReload={[
            ReloadActionEnum.RELOAD_SELL_PROGRESS_TRANSACTION_LIST,
            ReloadActionEnum.HOME_PROFIT_SECTION,
            ReloadActionEnum.RELOAD_USER_STOCK_LIST,
          ]}
        />
      ) : (
        <p>Aucune</p>
      )}
    </section>
  );
}

export default SellProgessList;
