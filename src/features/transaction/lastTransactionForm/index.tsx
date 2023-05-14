import styles from './transactionForm.module.scss';

import { useAppDispatch } from '@/features/store/hooks';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { Transaction } from '@prisma/client';
import Button from '../../../components/form/Button';

interface ILastTransactionProps {
  item: Transaction;
}

function LastTransactionForm({
  item,
}: ILastTransactionProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  const handleUseLastSold = (lt: TransactionFormType) => {
    dispatch(postTransactionThunk({ body: lt }));
  };

  if (!item) {
    return null;
  }

  return (
    <form className={styles.lastSell} onSubmit={() => handleUseLastSold(item)}>
      <h5>Vente à partir de l&#0039;ancienne transaction</h5>
      <div>
        <table>
          <thead>
            <tr>
              <th>Quantité</th>
              <th>Fee</th>
              <th>Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.quantity}</td>
              <td>{item.fee}</td>
              <td>{item.value}</td>
            </tr>
          </tbody>
        </table>
        <Button type='submit' primary>
          Créer vente
        </Button>
      </div>
    </form>
  );
}

export default LastTransactionForm;
