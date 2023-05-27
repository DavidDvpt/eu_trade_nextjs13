'use client';

import ItemTitle from '@/components/common/itemTitle';
import { ReloadActionEnum } from '@/features/global/globalEnums';
import ItemSearchEngineContainer from '@/features/itemSearchEngine/itemSearchEngineContainer';
import LastTransactionForm from '@/features/transaction/lastTransactionForm';
import TransactionForm from '@/features/transaction/transactionForm';
import TransactionGenericTable from '@/features/transaction/transactionGenericTable';
import { Item, SellStatus, TransactionType } from '@prisma/client';
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
      <ItemSearchEngineContainer
        callback={handleItemChange}
        toReload={[
          ReloadActionEnum.RELOAD_UNIQUE_ITEM_QUANTITY,
          ReloadActionEnum.RELOAD_SELL_ENDED_TRANSACTION_LIST,
        ]}
      />

      <ItemTitle item={item} />

      {item && <AvailableQuantity itemId={item.id} />}

      <LastTransactionForm
        item={item}
        transactionType={TransactionType.SELL}
        sellStatus={SellStatus.ENDED}
        toReload={[ReloadActionEnum.RELOAD_UNIQUE_ITEM_QUANTITY]}
      />

      <TransactionForm
        item={item}
        type={TransactionType.SELL}
        toReload={[ReloadActionEnum.RELOAD_UNIQUE_ITEM_QUANTITY]}
      />

      {item && (
        <TransactionGenericTable
          headers={headers}
          itemId={item.id}
          transactionType={TransactionType.SELL}
          sellStatus={SellStatus.ENDED}
          sortKey='createdAt'
          order='asc'
          limit={10}
          title='Dernières ventes pour cet item'
          name={ReloadActionEnum.RELOAD_SELL_ENDED_TRANSACTION_LIST}
        />
      )}
    </div>
  );
}

export default Sell;
