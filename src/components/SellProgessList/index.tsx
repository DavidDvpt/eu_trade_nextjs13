import { fetchTransactions } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import SellProgessTable from './SellProgessTable';

function SellProgessList(): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['resourceTypes'],
    queryFn: async () => {
      const response = await fetchTransactions({ sellStatus: 'PROGRESS' });
      console.log('useQuery', response);
      return response;
    },
  });
  return (
    <div>
      <h4>Ventes en cours</h4>
      <SellProgessTable rows={data ?? []} />
    </div>
  );
}

export default SellProgessList;
