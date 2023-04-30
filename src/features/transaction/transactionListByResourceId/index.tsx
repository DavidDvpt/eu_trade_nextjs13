import GenericTable from '@/components/generic/genericTable';
import useTransactions from '@/features/transaction/useTransaction';
import { TransactionType } from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import {
  transactionFooterRowParser,
  transactionRowParser,
} from './transactionLib';
import styles from './transactionListByResourceId.module.scss';

interface IBuyTransactionResourceListProps {
  resourceId: string;
  headers: GenericHeadersTableType<TransactionRowForTable>;
  type: TransactionType;
}
function TransactionListByResourceId({
  resourceId,
  type,
  headers,
}: IBuyTransactionResourceListProps) {
  const { transactions } = useTransactions({ resourceId, type });
  const [totalRow, setTotalRow] = useState<TransactionRowForTable>();
  const [rows, setRows] = useState<TransactionRowsForTable>([]);

  useEffect(() => {
    if (transactions && !isEmpty(transactions)) {
      const footerRow: TransactionRow = {
        date: '',
        name: '',
        quantity: 0,
        ttCost: 0,
        // fee: 0,
        ttcCost: 0,
        extraCost: 0,
        markup: 0,
      };

      if (type === TransactionType.SELL) footerRow.fee = 0;

      const parsedRows: TransactionRowsForTable = [];

      transactions?.forEach((e) => {
        const r = e.resource;
        const tt = e.quantity * r.value;
        const ec = e.value - tt - (e.fee ?? 0);

        //create displayed row
        const tableRow = transactionRowParser(e, tt);

        parsedRows.unshift(tableRow);

        // create footer row
        footerRow.quantity = footerRow.quantity + e.quantity;
        footerRow.ttCost = footerRow.ttCost + tt;
        footerRow.ttcCost = footerRow.ttcCost + e.value;
        footerRow.extraCost = footerRow.extraCost + ec;
        if (type === TransactionType.SELL && e.fee) {
          footerRow.fee = (footerRow.fee as number) + e.fee;
        }
      });

      footerRow.markup = (footerRow.ttcCost / footerRow.ttCost) * 100;

      const parsedFooterRow: TransactionRowForTable =
        transactionFooterRowParser(footerRow);

      setRows(parsedRows);
      setTotalRow(parsedFooterRow);
    }
  }, [transactions]);

  return (
    <div className={styles.transactionByResourceIdTableContainer}>
      <GenericTable header={headers} rows={rows ?? []} footerRow={totalRow} />
    </div>
  );
}

export default TransactionListByResourceId;
