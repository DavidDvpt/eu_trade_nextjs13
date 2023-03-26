'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import { Resource } from '@prisma/client';
import styles from './buy.module.scss';

function Buy(): React.ReactElement {
  const handleChange = (value: Resource) => {
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
