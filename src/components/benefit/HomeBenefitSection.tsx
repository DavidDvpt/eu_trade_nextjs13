import { fetchTransactionsBenefit } from '@/lib/axios/requests/transaction';
import { getFixedNumber } from '@/lib/numberTools';
import { useQuery } from '@tanstack/react-query';
import styles from './benefit.module.scss';
function BenefitHomeSection(): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['totalBenefit'],
    queryFn: async () => {
      const response = await fetchTransactionsBenefit();
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
        <span>{getFixedNumber(2, data?.total)}</span>
      </p>
    </section>
  );
}

export default BenefitHomeSection;
