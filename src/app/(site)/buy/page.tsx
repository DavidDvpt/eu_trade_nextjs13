'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import { Resource } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';
import BuyForm from './buyForm';

function Buy(): React.ReactElement {
  const [reload, setReload] = useState(false);
  const [resource, setResource] = useState<Resource | null>(null);
  const handleChange = (value: Resource) => {
    setResource(value);
  };

  return (
    <div className={styles.buy}>
      <ResourceSearch onChange={handleChange} />

      <section>
        <BuyForm resource={resource} />
      </section>
      <section></section>
    </div>
  );
}

export default Buy;
