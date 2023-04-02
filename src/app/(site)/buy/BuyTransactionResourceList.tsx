import TransactionList from '@/components/transactionList';
import { fetchTransactionsByResourceId } from '@/lib/axios/requests/transaction';
import { Resource } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
interface IBuyTransactionResourceListProps {
  resourceId?: string;
}
function BuyTransactionResourceList({
  resourceId,
}: IBuyTransactionResourceListProps) {
  const [totalRow, setTotalRow] = useState<TransactionListRow | null>(null);
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

  useEffect(() => {
    if (data) {
      const row: TransactionListRow = {
        name: '',
        quantity: 0,
        ttCost: 0,
        ttcCost: 0,
        extraCost: 0,
        percentCost: 0,
      };

      data.forEach((e) => {
        const r = e.resource as Resource;
        const tt = e.quantity * r.value;
        const ec = e.value - tt;

        row.quantity = row.quantity + e.quantity;
        row.ttCost = row.ttCost + tt;
        row.ttcCost = row.ttcCost + e.value;
        row.extraCost = row.extraCost + ec;
      });

      row.percentCost = (row.ttcCost / row.ttCost) * 100;

      setTotalRow(row);
    }
  }, [data]);

  return <TransactionList transactions={data} totalRow={totalRow} />;
}

export default BuyTransactionResourceList;
