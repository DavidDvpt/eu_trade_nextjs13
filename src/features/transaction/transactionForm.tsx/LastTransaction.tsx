import { TransactionExtended } from '@/app/extendedAppTypes';
import styles from './transactionForm.module.scss';

import { useAppDispatch } from '@/features/store/hooks';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { SellStatus, TransactionType } from '@prisma/client';
import Button from '../../../components/form/Button';
interface ILastTransactionProps {
  item: TransactionExtended;
}

function LastTransaction({ item }: ILastTransactionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleUseLastSold = () => {
    if (item) {
      const { fee, quantity, resourceId, value } = item;
      const t = {
        fee: fee ?? 0,
        quantity,
        resourceId,
        transactionType: TransactionType.SELL,
        sellStatus: SellStatus.PROGRESS,
        value,
      };

      dispatch(postTransactionThunk({ body: t }));
    }
  };
  return (
    <div className={styles.lastSell}>
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
              <td>{item?.quantity}</td>
              <td>{item?.fee}</td>
              <td>{item?.value}</td>
            </tr>
          </tbody>
        </table>
        <Button type='button' onClick={handleUseLastSold} primary>
          Créer vente
        </Button>
      </div>
    </div>
  );
}

export default LastTransaction;
