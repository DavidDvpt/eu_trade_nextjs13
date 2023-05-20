'use client';

import HomeProfitSection from '@/components/profit/HomeProfitSection';
import SellProgessList from '@/components/sell/SellProgessList';
import UserStockList from '../../features/stock/userStockList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div className={styles.leftColumn}>
        <UserStockList />
        <HomeProfitSection />
      </div>
      <div className={styles.rightColumn}>
        <SellProgessList />
      </div>
    </div>
  );
}
