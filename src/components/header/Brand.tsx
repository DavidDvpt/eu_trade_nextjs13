'use client';

import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

function Brand() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.brand} onClick={handleClick}>
      EU Trade
    </div>
  );
}

export default Brand;
