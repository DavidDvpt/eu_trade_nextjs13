'use client';

import ResourceTitle from '@/components/common/ResourceTitle';
import ResourceSearch from '@/components/common/resourceSearch.tsx';
import useStock from '@/features/stock/useStock';
import LastTransaction from '@/features/transaction/LastTransactionForm';
import TransactionForm from '@/features/transaction/transactionForm';
import TransactionListByResourceId from '@/features/transaction/transactionListByResourceId';
import { Resource, TransactionType } from '@prisma/client';
import { useEffect, useState } from 'react';
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
  const { getMaxResourceQty, maxResourceQty } = useStock();
  const [resource, setResource] = useState<Resource | null>(null);
  const handleChange = (value: Resource) => {
    setResource(value);
  };

  useEffect(() => {
    if (resource) {
      getMaxResourceQty(resource.id);
    }
  }, [resource]);

  return (
    <div className={styles.sell}>
      <ResourceSearch onChange={handleChange} />
      {resource && (
        <>
          <ResourceTitle resource={resource} />
          <p>Stock: {maxResourceQty}</p>

          <LastTransaction resource={resource} maxQty={maxResourceQty} />
        </>
      )}
      <section>
        <TransactionForm
          resource={resource}
          type={TransactionType.SELL}
          maxQty={maxResourceQty}
        />
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
