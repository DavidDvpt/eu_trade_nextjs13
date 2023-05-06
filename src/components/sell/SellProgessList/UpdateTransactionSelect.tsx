import { TransactionExtended } from '@/app/extendedAppTypes';
import GenericSelect from '@/components/form/GenericSelect';
import useTransactions from '@/features/transaction/useTransaction';
import { SellStatus } from '@prisma/client';
import { ChangeEvent, useState } from 'react';

interface IUpdateTransactionSelectProps {
  transaction: TransactionExtended;
}

function UpdateTransactionButton({
  transaction,
}: IUpdateTransactionSelectProps): JSX.Element {
  const { updateTransaction } = useTransactions({});
  const [value, setValue] = useState<SellStatus>(
    transaction.sellStatus ?? SellStatus.PROGRESS
  );

  const items = Object.values(SellStatus).map((m) => ({ value: m, label: m }));

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SellStatus;
    setValue(value);
    const updated: TransactionExtended = { ...transaction, sellStatus: value };

    updateTransaction(updated);
  };

  return (
    <GenericSelect
      items={items}
      value={value ?? ''}
      onChange={handleChange}
      name='sellStatus'
    />
  );
}

export default UpdateTransactionButton;
