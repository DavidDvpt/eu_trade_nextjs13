import styles from './lastTransactionForm.module.scss';

import { globalActions } from '@/features/global/globalSlice';
import { useAppDispatch } from '@/features/store/hooks';
import { Item, SellStatus, TransactionType } from '@prisma/client';
import { FormEvent, useEffect } from 'react';

import Button from '@/components/form/Button';
import useTransactions from '../useTransactions';

interface ILastTransactionProps extends IToReload {
  item: Item | null;
  transactionType?: TransactionType;
  sellStatus?: SellStatus;
}

function LastTransactionForm({
  item,
  transactionType,
  sellStatus,
  toReload,
}: ILastTransactionProps): JSX.Element | null {
  const { loadTransactions, transactions, createTransaction } =
    useTransactions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (item) {
      loadTransactions({
        sortKey: 'createdAt',
        itemId: item.id,
        order: 'desc',
        limit: 1,
        transactionType,
        sellStatus,
      });
    }
  }, [item]);

  const handleUseLastSold = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (transactions && transactions[0]) {
      await createTransaction({
        ...transactions[0],
        type: TransactionType.SELL,
        sellStatus: SellStatus.PROGRESS,
      });

      if (toReload) {
        dispatch(globalActions.addReload(toReload));
      }
    }
  };

  if (!item || !(transactions && transactions[0])) {
    return null;
  }

  return (
    <section className={styles.lastTransactionForm}>
      <form onSubmit={handleUseLastSold}>
        <h5>Vente à partir de l&#0039;ancienne transaction</h5>
        <div className={styles.container}>
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
