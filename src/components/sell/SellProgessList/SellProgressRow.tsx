import { TransactionExtended } from '@/app/extendedAppTypes';
import styles from './sellProgressList.module.scss';
import UpdateTransactionButton from './UpdateTransactionSelect';
interface ISellProgressRowProps {
  row: TransactionExtended;
}

function SellProgressRow({ row }: ISellProgressRowProps): JSX.Element {
  return (
    <tr>
      <td>{new Date(row.createdAt).toLocaleDateString('fr-FR')}</td>
      <td>{row.resource.name}</td>
      <td>{row.quantity}</td>
      <td>{row.value}</td>
      <td className={styles.updateSelect}>
        <UpdateTransactionButton transaction={row} />
      </td>
    </tr>
  );
}

export default SellProgressRow;
