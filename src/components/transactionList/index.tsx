import { fetchTransactionsByResourceId } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import TransactionRow from './TranactionRow';

interface ITransactionListProps {
  resourceId?: string;
}
function TransactionList({
  resourceId,
}: ITransactionListProps): React.ReactElement {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactionList', resourceId],
    queryFn: async () => {
      const response = await fetchTransactionsByResourceId({
        id: resourceId,
        type: 'BUY',
      });
      return response;
    },
  });

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
        {data?.map((m) => (
          <TransactionRow key={m.id} row={m} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;
