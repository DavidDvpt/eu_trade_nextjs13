import styles from './transactionForm/transactionForm.module.scss';

import { Resource, SellStatus, TransactionType } from '@prisma/client';
import { useEffect } from 'react';
import Button from '../../components/form/Button';
import useTransactions from './useTransaction';
interface ILastTransactionProps {
  resource: Resource;
}

function LastTransaction({
  resource,
}: ILastTransactionProps): JSX.Element | null {
  const { lastSoldTransaction, transactions, createTransaction } =
    useTransactions({});

  useEffect(() => {
    if (resource) {
      lastSoldTransaction(resource.id);
    }
  }, [resource]);

  const handleUseLastSold = async () => {
    if (resource && transactions && transactions[0]) {
      const newT = transactions[0];
      const t: PostTransactionBody = {
        resourceId: newT.resourceId,
        transactionType: TransactionType.SELL,
        sellStatus: SellStatus.PROGRESS,
        value: newT.value,
        quantity: newT.quantity,
        fee: newT.fee,
      };

      await createTransaction(t);
    }
  };

  if (!transactions) {
    return null;
  }
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
              <td>{transactions[0]?.quantity}</td>
              <td>{transactions[0]?.fee}</td>
              <td>{transactions[0]?.value}</td>
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
