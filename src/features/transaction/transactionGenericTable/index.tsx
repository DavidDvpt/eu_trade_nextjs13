import GenericTable from '@/components/generic/genericTable';
import { ReloadActionEnum } from '@/features/global/globalEnums';
import { getGlobalState, globalActions } from '@/features/global/globalSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { TransactionType } from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import useTransactions from '../useTransactions';
import styles from './transactionGenericTable.module.scss';
import {
  transactionFooterRowParser,
  transactionRowParser,
} from './transactionLib';

interface ITransactionGenericTableProps extends IFetchTransactionsParams {
  headers: GenericHeadersTableType<TransactionRowForTable>;
  title: string;
  name: ReloadActionEnum;
}
function TransactionGenericTable({
  itemId,
  transactionType,
  sellStatus,
  headers,
  title,
  limit,
  order,
  sortKey,
  name,
}: ITransactionGenericTableProps) {
  const { reload } = useAppSelector(getGlobalState);
  const { transactions, loadTransactions, apiState } = useTransactions();
  const [totalRow, setTotalRow] = useState<TransactionRowForTable>();
  const [rows, setRows] = useState<TransactionRowsForTable>([]);
  const dispatch = useAppDispatch();

  const request = () => {
    if (apiState.status !== ApiStatusEnum.PENDING) {
      loadTransactions({
        itemId,
        transactionType,
        sellStatus,
        sortKey,
        order,
        limit,
      });
    }
  };

  useEffect(() => {
    if (reload.includes(name)) {
      request();
      dispatch(globalActions.removeReload(name));
    }
  }, [reload, itemId]);

  // useEffect(() => {
  //   request();
  // }, []);

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

      if (transactionType === TransactionType.SELL) footerRow.fee = 0;

      const parsedRows: TransactionRowsForTable = [];

      transactions?.forEach((e) => {
        const r = e.item;
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
        if (transactionType === TransactionType.SELL && e.fee) {
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
    <section className={styles.transactionByResourceIdTableContainer}>
      <h4>{title}</h4>
      <GenericTable header={headers} rows={rows ?? []} footerRow={totalRow} />
    </section>
  );
}

export default TransactionGenericTable;
