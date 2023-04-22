import { TransactionsExtended } from '@/app/extendedAppTypes';
import TransactionRow from './TranactionRow';
import styles from './transaction.module.scss';

interface ITransactionListProps {
  transactions?: TransactionsExtended;
  totalRow: TransactionRow | null;
}
function TransactionList({
  transactions,
  totalRow,
}: ITransactionListProps): React.ReactElement {
  return (
    <table className={styles.transactionList}>
      <thead>
        <tr>
          <th>Date</th>
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
            <td></td>
            <td></td>
            <td>{totalRow.quantity}</td>
            <td>{Number(totalRow.ttCost).toFixed(2)}</td>
            <td>{totalRow.ttcCost}</td>
            <td>{Number(totalRow.extraCost).toFixed(2)}</td>
            <td>{Number(totalRow.markup).toFixed(2)}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default TransactionList;
