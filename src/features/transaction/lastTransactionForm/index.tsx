import styles from '../transactionForm/transactionForm.module.scss';

import { useAppDispatch } from '@/features/store/hooks';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { Item, SellStatus, TransactionType } from '@prisma/client';
import { FormEvent, useEffect } from 'react';
import Button from '../../../components/form/Button';
import useTransactions from '../useTransactions';

interface ILastTransactionProps {
  item: Item | null;
  transactionType?: TransactionType;
  sellStatus?: SellStatus;
}

function LastTransactionForm({
  item,
  transactionType,
  sellStatus,
}: ILastTransactionProps): JSX.Element | null {
  const { loadTransactions, apiState, transactions } = useTransactions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (item) {
      loadTransactions({
        itemId: item.id,
        order: 'desc',
        limit: 1,
        transactionType,
        sellStatus,
      });
    }
  }, [item]);

  const handleUseLastSold = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (transactions && transactions[0]) {
      dispatch(
        postTransactionThunk({
          body: {
            ...transactions[0],
            type: TransactionType.SELL,
            sellStatus: SellStatus.PROGRESS,
          },
        })
      );
    }
  };

  if (!item || !(transactions && transactions[0])) {
    return null;
  }

  return (
    <section>
      <form className={styles.lastSell} onSubmit={handleUseLastSold}>
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
                <td>{transactions[0].quantity}</td>
                <td>{transactions[0].fee}</td>
                <td>{transactions[0].value}</td>
              </tr>
            </tbody>
          </table>
          <Button type='submit' primary>
            Créer vente
          </Button>
        </div>
      </form>
    </section>
  );
}

export default LastTransactionForm;
