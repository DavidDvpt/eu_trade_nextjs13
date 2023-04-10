import styles from './stockList.module.scss';
interface IStockRowProps {
  row: Stock;
}

function StockRow({ row }: IStockRowProps): JSX.Element {
  return (
    <tr>
      <td className={styles.nameCell}>{row.resourceName}</td>
      <td>{row.quantity}</td>
      <td>{Number(row.value).toFixed(2)}</td>
      <td>détail btn</td>
    </tr>
  );
}

export default StockRow;
