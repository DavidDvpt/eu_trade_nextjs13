'use client';

import HomeProfitSection from '@/components/profit/HomeProfitSection';
import SellProgessList from '@/components/sell/SellProgessList';
import SimpleStockList from '../../components/stock/SimpleStockList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div>
        <SimpleStockList />
        <HomeProfitSection />
      </div>
      <div>
        <SellProgessList />
      </div>
    </div>
  );
}
