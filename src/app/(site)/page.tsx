'use client';

import BenefitHomeSection from '@/components/benefit/HomeBenefitSection';
import SellProgessList from '@/components/SellProgessList';
import StockList from '@/components/StockList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div>
        <StockList />
        <BenefitHomeSection />
      </div>
      <div>
        <SellProgessList />
      </div>
    </div>
  );
}
