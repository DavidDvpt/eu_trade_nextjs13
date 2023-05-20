import GenericTable from '@/components/generic/genericTable';
import { getStockState, stockActions } from '@/features/stock/stockSlice';
import { fetchUserStockListThunk } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { useEffect, useState } from 'react';
import styles from './userStockList.module.scss';

const homeStockTableHeader: GenericHeadersTableType<HomeStockTableRow> = [
  { name: 'Nom', key: 'iName' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Valeur', key: 'value' },
];

function UserStockList(): JSX.Element {
  const { userStockList } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();
  const [footerRow, setFooterRow] = useState<HomeStockTableRow>({
    iName: '',
    quantity: '',
    value: '0',
  });
  const [rows, setRows] = useState<HomeStockTableRows>([]);

  useEffect(() => {
    dispatch(fetchUserStockListThunk());

    return () => {
      dispatch(stockActions.userStockListReset());
    };
  }, []);

  useEffect(() => {
    if (userStockList.result) {
      const tempRows: HomeStockTableRows = [];

      userStockList.result.forEach((e) => {
        const temp: HomeStockTableRow = {
          ...e,
          quantity: String(e.quantity),
          value: Number(e.value).toFixed(2),
        };
        tempRows.push(temp);
      });

      setRows(tempRows);

      //footerRow
      const total = Number(
        userStockList.result.reduce((t, c) => {
          return (t += c.value);
        }, 0)
      ).toFixed(2);

      setFooterRow({ ...footerRow, value: total });
    }
  }, [userStockList.result]);

  return (
    <section className={styles.homeStockList}>
      <GenericTable
        title='Stock'
        header={homeStockTableHeader}
        rows={rows ?? []}
        footerRow={footerRow}
      />
    </section>
  );
}

export default UserStockList;
