'use client';

import ItemTitle from '@/components/common/itemTitle';
import ItemSearchEngineContainer from '@/features/itemSearchEngine/itemSearchEngineContainer';
import TransactionForm from '@/features/transaction/transactionForm.tsx';
import TransactionGenericTable from '@/features/transaction/transactionGenericTable';
import { Item, TransactionType } from '@prisma/client';
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
  const [item, setItem] = useState<Item | null>(null);

  const handleItemChange = (value: Item | null) => setItem(value);

  return (
    <div className={styles.sell}>
      <ItemSearchEngineContainer callback={handleItemChange} />

      <ItemTitle item={item} />

      <AvailableQuantity itemId={item?.id ?? null} />

      <TransactionForm item={item} type={TransactionType.SELL} />

      {item && (
        <TransactionGenericTable
          headers={headers}
          itemId={item.id}
          type={TransactionType.SELL}
          title='Dernières ventes pour cet item'
        />
      )}
    </div>
  );
}

export default Sell;
