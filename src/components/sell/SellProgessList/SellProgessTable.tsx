import { TransactionsExtended } from '@/app/extendedAppTypes';
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
        {rows.map((row) => (
          <SellProgressRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default SellProgessTable;
