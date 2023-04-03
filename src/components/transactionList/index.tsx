import { TransactionsExtended } from '@/app/extendedAppTypes';
import TransactionRow from './TranactionRow';

interface ITransactionListProps {
  transactions?: TransactionsExtended;
  totalRow: TransactionListRow | null;
}
function TransactionList({
  transactions,
  totalRow,
}: ITransactionListProps): React.ReactElement {
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Cout TT</th>
          <th>Cout TTC</th>
          <th>Cout Extra</th>
          <th>Cout %</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((m) => (
          <TransactionRow key={m.id} row={m} />
        ))}
      </tbody>
      {totalRow && (
        <tfoot>
          <tr>
            <td>{totalRow.name}</td>
            <td>{totalRow.quantity}</td>
            <td>{totalRow.ttCost}</td>
            <td>{totalRow.ttcCost}</td>
            <td>{Number(totalRow.extraCost).toFixed(2)}</td>
            <td>{Number(totalRow.percentCost).toFixed(2)}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default TransactionList;
