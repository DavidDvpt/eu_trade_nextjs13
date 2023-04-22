'use client';

import HomeProfitSection from '@/components/profit/HomeProfitSection';
import SellProgessList from '@/components/sell/SellProgessList';
import HomeStockList from '../../components/stock/HomeStockList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div>
        <HomeStockList />
        <HomeProfitSection />
      </div>
      <div>
        <SellProgessList />
      </div>
    </div>
  );
}
