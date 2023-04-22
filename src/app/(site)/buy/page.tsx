'use client';

import ResourceSearch from '@/components/common/resourceSearch.tsx';
import TransactionForm from '@/components/transaction/transactionForm.tsx';
import TransactionListByResourceId from '@/components/transaction/transactionListByResourceId';
import { Resource, TransactionType } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';

function Buy(): React.ReactElement {
  const [resource, setResource] = useState<Resource | null>(null);
  const handleChange = (value: Resource) => {
    setResource(value);
  };

  return (
    <div className={styles.buy}>
      <ResourceSearch onChange={handleChange} />

      <TransactionForm resource={resource} type={TransactionType.BUY} />

      {resource && (
        <section>
          <h4>Liste des précédents achats</h4>
          <TransactionListByResourceId
            resourceId={resource?.id ?? ''}
            type={TransactionType.BUY}
          />
        </section>
      )}
    </div>
  );
}

export default Buy;
