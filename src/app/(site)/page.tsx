'use client';

import BenefitHomeSection from '@/components/benefit/HomeBenefitSection';
import SellProgessList from '@/components/SellProgessList';

import styles from './home.module.scss';
import HomeStockList from './HomeStockList';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div>
        <HomeStockList />
        <BenefitHomeSection />
      </div>
      <div>
        <SellProgessList />
      </div>
    </div>
  );
}
