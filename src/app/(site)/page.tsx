'use client';

import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div className={styles.leftColumn}>
        {/* <SimpleStockList />
        <HomeProfitSection /> */}
      </div>
      <div className={styles.rightColumn}>{/* <SellProgessList /> */}</div>
    </div>
  );
}
