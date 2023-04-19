import { TransactionsExtended } from '@/app/extendedAppTypes';
import GenericTable, {
  GenericHeadersTableType,
} from '@/components/common/GenericTable';
import { fetchTransactionsByResourceId } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

const header: GenericHeadersTableType<TransactionListRowForTable> = [
  { name: 'Date', key: 'date' },
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Cout TT', key: 'ttCost' },
  { name: 'Cout TTC', key: 'ttcCost' },
  { name: 'Cout Extra', key: 'extraCost' },
  { name: 'Markup', key: 'markup' },
];
interface IBuyTransactionResourceListProps {
  resourceId?: string;
}
function BuyTransactionResourceList({
  resourceId,
}: IBuyTransactionResourceListProps) {
  const [totalRow, setTotalRow] = useState<TransactionListRowForTable>();
  const [rows, setRows] = useState<TransactionListRowsForTable>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactionList', resourceId],
    queryFn: async () => {
      const response = await fetchTransactionsByResourceId({
        id: resourceId,
        type: 'BUY',
      });

      return response as TransactionsExtended;
    },
  });

  useEffect(() => {
    if (data && !isEmpty(data)) {
      const row: TransactionListRow = {
        date: '',
        name: '',
        quantity: 0,
        ttCost: 0,
        ttcCost: 0,
        extraCost: 0,
        markup: 0,
      };

      const tempRows: TransactionListRowsForTable = [];

      data?.forEach((e) => {
        const r = e.resource;
        const tt = e.quantity * r.value;
        const ec = e.value - tt;

        //create displayed row
        const parsedRow: TransactionListRowForTable = {
          date: new Date(e.createdAt).toLocaleDateString('fr-FR'),
          name: e.resource.name,
          quantity: e.quantity,
          ttCost: Number(tt).toFixed(2),
          ttcCost: e.value,
          extraCost: Number(e.value - tt).toFixed(2),
          markup: tt > 0 ? Number((e.value / tt) * 100).toFixed(2) : '-',
        };

        tempRows.push(parsedRow);

        // create footer row
        row.quantity = row.quantity + e.quantity;
        row.ttCost = row.ttCost + tt;
        row.ttcCost = row.ttcCost + e.value;
        row.extraCost = row.extraCost + ec;
      });

      row.markup = (row.ttcCost / row.ttCost) * 100;

      setRows(tempRows);
      // setTotalRow(row);
    }
  }, [data]);

  return (
    <>
      {/* <TransactionList transactions={data} totalRow={totalRow} />{' '} */}
      <GenericTable header={header} rows={rows ?? []} footerRow={totalRow} />
    </>
  );
}

export default BuyTransactionResourceList;
