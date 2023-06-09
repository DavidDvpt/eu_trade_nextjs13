import { ReloadActionEnum } from '@/features/global/globalEnums';
import { getGlobalState, globalActions } from '@/features/global/globalSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { getTransactionState } from '@/features/transaction/transactionSlice';
import { fetchTransactionsGlobalProfitThunk } from '@/features/transaction/transactionThunks';
import { getFixedNumber } from '@/lib/numberTools';
import { useEffect } from 'react';
import styles from './profit.module.scss';

function HomeProfitSection(): React.ReactElement {
  const NAME = ReloadActionEnum.HOME_PROFIT_SECTION;
  const { transactionProfit } = useAppSelector(getTransactionState);
  const { reload } = useAppSelector(getGlobalState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsGlobalProfitThunk());
  }, []);

  useEffect(() => {
    if (reload.includes(NAME)) {
      dispatch(fetchTransactionsGlobalProfitThunk());
      dispatch(globalActions.removeReload(NAME));
    }
  }, [reload]);

  const tr = transactionProfit.result;

  return (
    <section className={styles.homeBenefitSection}>
      <h4>Bilan total</h4>
      <p>
        <span>Cout achat :</span>
        <span>{getFixedNumber(2, tr?.buy)}</span>
      </p>
      <p>
        <span>Perte retour :</span>
        <span>{getFixedNumber(2, tr?.feeLost)}</span>
      </p>
      <p>
        <span>Gain vente :</span>
        <span>{getFixedNumber(2, tr?.sellBenefit)}</span>
      </p>
      <p className={styles.total}>
        <span>Total :</span>
        <span className={tr?.total < 0 ? styles.negative : ''}>
          {getFixedNumber(2, tr?.total)}
        </span>
      </p>
    </section>
  );
}

export default HomeProfitSection;
