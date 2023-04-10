import { fetchTransactions } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import SellProgessTable from './SellProgessTable';
import styles from './sellProgressList.module.scss';
function SellProgessList(): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['sellProgressList'],
    queryFn: async () => {
      const response = await fetchTransactions({ sellStatus: 'PROGRESS' });

      return response;
    },
  });
  return (
    <section className={styles.sellProgressList}>
      <h4>Ventes en cours</h4>
      <SellProgessTable rows={data ?? []} />
    </section>
  );
}

export default SellProgessList;
