import { TransactionsExtended } from '@/app/extendedAppTypes';
import GenericTable from '@/components/generic/genericTable';
import { fetchTransactionsByResourceId } from '@/lib/axios/requests/transaction';
import { TransactionType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { buyFooterRowParser, buyRowParser } from './buyLib';
import styles from './transactionListByResourceId.module.scss';

const header: GenericHeadersTableType<TransactionRowForTable> = [
  { name: 'Date', key: 'date' },
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Cout TT', key: 'ttCost' },
  { name: 'Cout TTC', key: 'ttcCost' },
  { name: 'Cout Extra', key: 'extraCost' },
  { name: 'Markup', key: 'markup' },
];
interface IBuyTransactionResourceListProps {
  resourceId: string;
  type: TransactionType;
}
function TransactionListByResourceId({
  resourceId,
  type,
}: IBuyTransactionResourceListProps) {
  const [totalRow, setTotalRow] = useState<TransactionRowForTable>();
  const [rows, setRows] = useState<TransactionRowsForTable>([]);
  const { data } = useQuery({
    queryKey: ['transactionList', resourceId],
    queryFn: async () => {
      const response = await fetchTransactionsByResourceId({
        id: resourceId,
        type,
      });

      return response as TransactionsExtended;
    },
  });

  useEffect(() => {
    if (data && !isEmpty(data)) {
      const footerRow: TransactionRow = {
        date: '',
        name: '',
        quantity: 0,
        ttCost: 0,
        ttcCost: 0,
        extraCost: 0,
        markup: 0,
      };

      const parsedRows: TransactionRowsForTable = [];

      data?.forEach((e) => {
        const r = e.resource;
        const tt = e.quantity * r.value;
        const ec = e.value - tt;

        //create displayed row
        const tableRow = buyRowParser(e, tt);

        parsedRows.push(tableRow);

        // create footer row
        footerRow.quantity = footerRow.quantity + e.quantity;
        footerRow.ttCost = footerRow.ttCost + tt;
        footerRow.ttcCost = footerRow.ttcCost + e.value;
        footerRow.extraCost = footerRow.extraCost + ec;
      });

      footerRow.markup = (footerRow.ttcCost / footerRow.ttCost) * 100;

      const parsedFooterRow: TransactionRowForTable =
        buyFooterRowParser(footerRow);

      setRows(parsedRows);
      setTotalRow(parsedFooterRow);
    }
  }, [data]);

  return (
    <div className={styles.transactionByResourceIdTableContainer}>
      <GenericTable header={header} rows={rows ?? []} footerRow={totalRow} />
    </div>
  );
}

export default TransactionListByResourceId;