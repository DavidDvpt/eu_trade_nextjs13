import useTransactions from '@/features/transaction/useTransaction';
import { SellStatus } from '@prisma/client';
import { isEmpty } from 'lodash';
import SellProgessTable from './SellProgessTable';
import styles from './sellProgressList.module.scss';

function SellProgessList(): React.ReactElement {
  const { transactions } = useTransactions({
    all: true,
    sellStatus: SellStatus.PROGRESS,
  });

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
