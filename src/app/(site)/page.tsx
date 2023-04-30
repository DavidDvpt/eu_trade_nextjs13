'use client';

import HomeProfitSection from '@/components/profit/HomeProfitSection';
import SellProgessList from '@/components/sell/SellProgessList';
import SimpleStockList from '../../components/stock/SimpleStockList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div className={styles.leftColumn}>
        <SimpleStockList />
        <HomeProfitSection />
      </div>
      <div className={styles.rightColumn}>
        <SellProgessList />
      </div>
    </div>
  );
}
