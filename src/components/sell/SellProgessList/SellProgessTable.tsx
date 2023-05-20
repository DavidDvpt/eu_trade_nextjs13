import { TransactionsExtended } from '@/app/extendedAppTypes';
import { nanoid } from '@reduxjs/toolkit';
import SellProgressRow from './SellProgressRow';

interface ISellProgessTableProps {
  rows: TransactionsExtended;
}

function SellProgessTable({ rows }: ISellProgessTableProps): JSX.Element {
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
          <SellProgressRow key={nanoid()} row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default SellProgessTable;
