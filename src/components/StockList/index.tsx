import { fetchStock } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import styles from './stockList.module.scss';
import StockTable from './StockTable';
function StockList(): JSX.Element {
  const { data } = useQuery({
    queryKey: ['stockList'],
    queryFn: async () => {
      const response = await fetchStock();

      return response;
    },
  });

  return (
    <section className={styles.stockList}>
      <h4>Stock</h4>
      <StockTable stock={data ?? []} />
    </section>
  );
}

export default StockList;
