import useTransactions from '@/features/transaction/useTransactions';
import { SellStatus, TransactionType } from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import SellProgessTable from './SellProgessTable';
import styles from './sellProgressList.module.scss';

function SellProgessList(): React.ReactElement {
  const { transactions, loadTransactions } = useTransactions();

  useEffect(() => {
    loadTransactions({
      transactionType: TransactionType.SELL,
      sellStatus: SellStatus.PROGRESS,
    });
  }, []);

  return (
    <section className={styles.sellProgressList}>
      <h4>Ventes en cours</h4>
      {!isEmpty(transactions) ? (
        <SellProgessTable rows={transactions ?? []} />
      ) : (
        <p>Aucune</p>
      )}
    </section>
  );
}

export default SellProgessList;
