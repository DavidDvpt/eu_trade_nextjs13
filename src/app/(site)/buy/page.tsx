'use client';

import ItemTitle from '@/components/common/itemTitle';
import { ReloadActionEnum } from '@/features/global/globalEnums';
import ItemSearchEngineContainer from '@/features/itemSearchEngine/itemSearchEngineContainer';
import TransactionForm from '@/features/transaction/transactionForm';
import TransactionGenericTable from '@/features/transaction/transactionGenericTable';
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

  const handleItemChange = (value: Item | null) => setItem(value);

  return (
    <div className={styles.buy}>
      <ItemSearchEngineContainer callback={handleItemChange} />

      <ItemTitle item={item} />

      <TransactionForm
        item={item}
        type={TransactionType.BUY}
        toReload={[ReloadActionEnum.RELOAD_BUY_TRANSACTION_LIST]}
      />

      {item && (
        <TransactionGenericTable
          title='Liste des précédents achats'
          headers={headers}
          itemId={item.id ?? ''}
          transactionType={TransactionType.BUY}
          name={ReloadActionEnum.RELOAD_BUY_TRANSACTION_LIST}
        />
      )}
    </div>
  );
}

export default Buy;
