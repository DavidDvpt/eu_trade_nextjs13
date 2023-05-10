import styles from './transactionForm.module.scss';

import { useAppDispatch } from '@/features/store/hooks';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { Item, SessionContext, TradingType } from '@prisma/client';
import { useEffect } from 'react';
import Button from '../../../components/form/Button';
interface ILastTransactionProps {
  item: Item;
  context: SessionContext;
  type: TradingType;
}

function LastTransactionForm({
  item,
  context,
  type,
}: ILastTransactionProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [item]);

  const handleUseLastSold = () => {
    if (item) {
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

export default LastTransactionForm;
