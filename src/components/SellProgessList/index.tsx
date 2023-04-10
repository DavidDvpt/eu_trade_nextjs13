import { fetchTransactions } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
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
      {!isEmpty(data) ? <SellProgessTable rows={data ?? []} /> : <p>Aucune</p>}
    </section>
  );
}

export default SellProgessList;
