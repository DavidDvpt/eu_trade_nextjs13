'use client';

import ResourceSearch from '@/components/resourceSearch.tsx';
import TransactionForm from '@/components/transactionForm.tsx';
import { Resource, TransactionType } from '@prisma/client';
import { useState } from 'react';
import styles from './sell.module.scss';
function Sell(): React.ReactElement {
  const [resource, setResource] = useState<Resource | null>(null);
  const handleChange = (value: Resource) => {
    setResource(value);
  };
  return (
    <div className={styles.sell}>
      <ResourceSearch onChange={handleChange} />
      <section>
        <TransactionForm resource={resource} type={TransactionType.SELL} />
      </section>
    </div>
  );
}

export default Sell;
