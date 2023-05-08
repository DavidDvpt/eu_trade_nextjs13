'use client';

import ResourceSearch from '@/components/common/resourceSearch.tsx';
import TransactionForm from '@/features/transaction/transactionForm.tsx';
import TransactionListByResourceId from '@/features/transaction/transactionListByResourceId';
import { Item, TradingType } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';

const headers: GenericHeadersTableType<TransactionRowForTable> = [
  { name: 'Date', key: 'date' },
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Cout TT', key: 'ttCost' },
  // { name: 'Fee', key: 'fee' },
  { name: 'Cout TTC', key: 'ttcCost' },
  { name: 'Cout Extra', key: 'extraCost' },
  { name: 'Markup', key: 'markup' },
];

function Buy(): React.ReactElement {
  const [item, setItem] = useState<Item | null>(null);

  const handleChange = (value: Item) => {
    setItem(value);
  };

  return (
    <div className={styles.buy}>
      <ResourceSearch onChange={handleChange} />

      <section>
        <TransactionForm item={item} type={TradingType.BUY} />
      </section>

      {item && (
        <section>
          <h4>Liste des précédents achats</h4>
          <TransactionListByResourceId
            headers={headers}
            resourceId={item?.id ?? ''}
            type={TradingType.BUY}
          />
        </section>
      )}
    </div>
  );
}

export default Buy;
