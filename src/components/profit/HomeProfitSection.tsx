import { fetchTransactionsProfit } from '@/lib/axios/requests/transaction';
import { getFixedNumber } from '@/lib/numberTools';
import { useQuery } from '@tanstack/react-query';
import styles from './profit.module.scss';

function HomeProfitSection(): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['totalProfit'],
    queryFn: async () => {
      const response = await fetchTransactionsProfit();
      return response;
    },
  });
  return (
    <section className={styles.homeBenefitSection}>
      <h4>Bilan total</h4>
      <p>
        <span>Cout achat :</span>
        <span>{getFixedNumber(2, data?.buy)}</span>
      </p>
      <p>
        <span>Perte retour :</span>
        <span>{getFixedNumber(2, data?.feeLost)}</span>
      </p>
      <p>
        <span>Gain vente :</span>
        <span>{getFixedNumber(2, data?.sellBenefit)}</span>
      </p>
      <p className={styles.total}>
        <span>Total :</span>
        <span className={data?.total < 0 ? styles.negative : ''}>
          {getFixedNumber(2, data?.total)}
        </span>
      </p>
    </section>
  );
}

export default HomeProfitSection;
