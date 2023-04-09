'use client';
import { fetchStockByResourceId } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';

interface IAvailableQuantityProps {
  setQuantity: (value: number) => void;
  resourceId: string | null;
}

function AvailableQuantity({
  resourceId,
  setQuantity,
}: IAvailableQuantityProps): JSX.Element {
  const { data, status } = useQuery({
    queryKey: ['availableResourceQuantity', resourceId],
    queryFn: async () => {
      const response = await fetchStockByResourceId(resourceId);

      setQuantity(response ?? 0);
      return response;
    },
  });

  if (status === 'loading') {
    return <div>Stock : chargement ...</div>;
  }

  return <div>Stock : {data ?? 0}</div>;
}

export default AvailableQuantity;
