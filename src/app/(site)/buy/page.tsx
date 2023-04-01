'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import TransactionList from '@/components/transactionList';
import { Resource } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';
import BuyForm from './buyForm';

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
        <TransactionList resourceId={resource?.id ?? undefined} />
      </section>
    </div>
  );
}

export default Buy;
