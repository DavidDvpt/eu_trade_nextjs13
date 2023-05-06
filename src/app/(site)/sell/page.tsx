'use client';

import ResourceTitle from '@/components/common/ResourceTitle';
import ResourceSearch from '@/components/common/resourceSearch.tsx';
import LastTransaction from '@/features/transaction/LastTransactionForm';
import TransactionForm from '@/features/transaction/transactionForm';
import TransactionListByResourceId from '@/features/transaction/transactionListByResourceId';
import { Resource, TransactionType } from '@prisma/client';
import { useState } from 'react';
import AvailableQuantity from './AvailableQuantity';
import styles from './sell.module.scss';

const headers: GenericHeadersTableType<TransactionRowForTable> = [
  { name: 'Date', key: 'date' },
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Prix TT', key: 'ttCost' },
  { name: 'Fee', key: 'fee' },
  { name: 'Prix TTC', key: 'ttcCost' },
  { name: 'Marge', key: 'extraCost' },
  { name: 'Markup', key: 'markup' },
];

function Sell(): React.ReactElement {
  const [resource, setResource] = useState<Resource | null>(null);

  const handleChange = (value: Resource) => {
    setResource(value);
  };

  return (
    <div className={styles.sell}>
      <ResourceSearch onChange={handleChange} />
      {resource && (
        <>
          <ResourceTitle resource={resource} />
          <AvailableQuantity resourceId={resource?.id ?? null} />
          <section>
            <LastTransaction resource={resource} />
          </section>
        </>
      )}
      <section>
        <TransactionForm resource={resource} type={TransactionType.SELL} />
      </section>
      {resource && (
        <section>
          <TransactionListByResourceId
            headers={headers}
            resourceId={resource.id}
            type={TransactionType.SELL}
          />
        </section>
      )}
    </div>
  );
}

export default Sell;
