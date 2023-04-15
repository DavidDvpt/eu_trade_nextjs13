import { isEmpty } from 'lodash';
import StockRow from './StockRow';

interface IStockTableProps {
  stock: Stocks;
}

function StockTable({ stock }: IStockTableProps): JSX.Element {
  console.log(stock);
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Valeur</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(stock) &&
          stock.map((row) => <StockRow key={row.resourceId} row={row} />)}
      </tbody>
      <tfoot>
        {' '}
        <tr>
          <td></td>
          <td></td>
          <td>
            {!isEmpty(stock) &&
              Number(
                stock.reduce((t, c) => {
                  return (t += c.value);
                }, 0)
              ).toFixed(2)}
          </td>{' '}
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default StockTable;
