import { TransactionsExtended } from '@/app/extendedAppTypes';
import { ReloadActionEnum } from '@/features/global/globalEnums';
import { nanoid } from '@reduxjs/toolkit';
import SellProgressRow from './SellProgressRow';

interface ISellProgessTableProps {
  rows: TransactionsExtended;
  toReload: ReloadActionEnum[];
}

function SellProgessTable({
  rows,
  toReload,
}: ISellProgessTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <SellProgressRow key={nanoid()} row={row} toReload={toReload} />
        ))}
      </tbody>
    </table>
  );
}

export default SellProgessTable;
