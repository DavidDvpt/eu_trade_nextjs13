import { Transaction } from '@prisma/client';

interface ISellProgessTableProps {
  rows: Transaction[];
}

function SellProgessTable({ rows }: ISellProgessTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

export default SellProgessTable;
