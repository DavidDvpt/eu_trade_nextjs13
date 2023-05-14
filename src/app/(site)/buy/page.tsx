'use client';

import ItemTitle from '@/components/common/itemTitle';
import ItemSearchEngineContainer from '@/features/itemSearchEngine/itemSearchEngineContainer';
import TransactionForm from '@/features/transaction/transactionForm.tsx';
import { Item, TransactionType } from '@prisma/client';
import { useState } from 'react';
import styles from './buy.module.scss';

const headers: GenericHeadersTableType<TransactionRowForTable> = [
  { name: 'Date', key: 'date' },
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Cout TT', key: 'ttCost' },
  { name: 'Fee', key: 'fee' },
  { name: 'Cout TTC', key: 'ttcCost' },
  { name: 'Cout Extra', key: 'extraCost' },
  { name: 'Markup', key: 'markup' },
];

function Buy(): React.ReactElement {
  const [item, setItem] = useState<Item | null>(null);

  const handleItem = (value: Item) => setItem(value);

  return (
    <div className={styles.buy}>
      <ItemSearchEngineContainer callback={handleItem} />

      <ItemTitle item={item} />

      <TransactionForm item={item} type={TransactionType.BUY} />

      {/* {item && (
        <section>
          <h4>Liste des précédents achats</h4>
          <TransactionListByResourceId
            headers={headers}
            resourceId={item.id ?? ''}
            type={TransactionType.BUY}
          />
        </section>
      )} */}
    </div>
  );
}

export default Buy;
