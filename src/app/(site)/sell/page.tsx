'use client';

import ResourceSearch from '@/components/common/resourceSearch.tsx';
import TransactionForm from '@/components/transaction/transactionForm.tsx';
import { Resource, TransactionType } from '@prisma/client';
import { useState } from 'react';
import AvailableQuantity from './AvailableQuantity';
import styles from './sell.module.scss';
function Sell(): React.ReactElement {
  const [resource, setResource] = useState<Resource | null>(null);
  const [avaliableQuantity, setAvaliableQuantity] = useState(0);
  const handleChange = (value: Resource) => {
    setResource(value);
  };

  const handleQuantity = (value: number) => {
    setAvaliableQuantity(value);
  };

  return (
    <div className={styles.sell}>
      <ResourceSearch onChange={handleChange} />
      <section>
        <AvailableQuantity
          resourceId={resource?.id ?? null}
          setQuantity={handleQuantity}
        />
        <TransactionForm
          resource={resource}
          type={TransactionType.SELL}
          avaliableQty={avaliableQuantity}
        />
      </section>
    </div>
  );
}

export default Sell;
