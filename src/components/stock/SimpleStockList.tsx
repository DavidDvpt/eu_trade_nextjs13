import GenericTable from '@/components/generic/genericTable';
import { getStockState, stockActions } from '@/features/stock/stockSlice';
import { fetchSimpleStockListThunk } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { useEffect, useState } from 'react';
import styles from './stock.module.scss';

type HomeStockTableRow = Omit<IHomeStockForTable, 'resourceId'>;

const homeStockTableHeader: GenericHeadersTableType<HomeStockTableRow> = [
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Valeur', key: 'price' },
];

function SimpleStockList(): JSX.Element {
  const { simpleStockList } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();
  const [footerRow, setFooterRow] = useState<HomeStockTableRow>({
    name: '',
    quantity: '',
    price: '0',
  });
  const [rows, setRows] = useState<HomeStockTableRows>([]);

  useEffect(() => {
    dispatch(fetchSimpleStockListThunk());

    return () => {
      dispatch(stockActions.simpleStockListReset());
    };
  }, []);

  useEffect(() => {
    if (simpleStockList.result) {
      const tempRows: HomeStockTableRows = [];

      simpleStockList.result.forEach((e) => {
        const temp: HomeStockTableRow = {
          ...e,
          quantity: String(e.quantity),
          price: Number(e.price).toFixed(2),
        };
        tempRows.push(temp);
      });

      setRows(tempRows);

      //footerRow
      const total = Number(
        simpleStockList.result.reduce((t, c) => {
          return (t += c.price);
        }, 0)
      ).toFixed(2);

      setFooterRow({ ...footerRow, price: total });
    }
  }, [simpleStockList.result]);

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

export default SimpleStockList;
