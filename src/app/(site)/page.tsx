'use client';

import SellProgessList from '@/components/SellProgessList';
import styles from './home.module.scss';

export default function Home(): React.ReactElement {
  return (
    <div className={styles.home}>
      <div></div>
      <div>
        <SellProgessList />
      </div>
    </div>
  );
}
