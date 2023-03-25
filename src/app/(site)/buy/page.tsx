'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import styles from './buy.module.scss';

function Buy(): React.ReactElement {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.buy}>
      <ResourceSearch onChange={handleChange} />

      <section></section>
      <section></section>
    </div>
  );
}

export default Buy;
