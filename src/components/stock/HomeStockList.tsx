import GenericTable from '@/components/generic/genericTable';
import { fetchStock } from '@/lib/axios/requests/transaction';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styles from './stock.module.scss';

type HomeStockTableRow = Omit<IHomeStockForTable, 'resourceId'>;

const homeStockTableHeader: GenericHeadersTableType<HomeStockTableRow> = [
  { name: 'Nom', key: 'name' },
  { name: 'Quantité', key: 'quantity' },
  { name: 'Valeur', key: 'price' },
];

function HomeStockList(): JSX.Element {
  const [footerRow, setFooterRow] = useState<HomeStockTableRow>({
    name: '',
    quantity: '',
    price: '0',
  });
  const [rows, setRows] = useState<HomeStockTableRows>([]);
  const { data } = useQuery({
    queryKey: ['homeStockList'],
    queryFn: async () => {
      const response = await fetchStock();

      return response;
    },
  });

  useEffect(() => {
    if (data) {
      const tempRows: HomeStockTableRows = [];

      data.forEach((e) => {
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
        data.reduce((t, c) => {
          return (t += c.price);
        }, 0)
      ).toFixed(2);

      setFooterRow({ ...footerRow, price: total });
    }
  }, [data]);

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

export default HomeStockList;
