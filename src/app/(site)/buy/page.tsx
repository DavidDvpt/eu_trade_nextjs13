'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import { Resource } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';
import BuyForm from './buyForm';
import BuyTransactionResourceList from './BuyTransactionResourceList';

function Buy(): React.ReactElement {
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
      <section>
        <h4>Liste des précédents achats</h4>
        <BuyTransactionResourceList resourceId={resource?.id ?? undefined} />
      </section>
    </div>
  );
}

export default Buy;
