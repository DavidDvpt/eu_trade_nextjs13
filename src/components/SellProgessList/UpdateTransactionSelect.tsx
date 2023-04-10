import { TransactionExtended } from '@/app/extendedAppTypes';
import { updateTransaction } from '@/lib/axios/requests/transaction';
import { SellStatus } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import GenericSelect from '../form/GenericSelect';
interface IUpdateTransactionSelectProps {
  transaction: TransactionExtended;
}

function UpdateTransactionButton({
  transaction,
}: IUpdateTransactionSelectProps): JSX.Element {
  const queryClient = useQueryClient();
  const [value, setValue] = useState<SellStatus>(
    transaction.sellStatus ?? SellStatus.PROGRESS
  );
  const items = Object.values(SellStatus).map((m) => ({ value: m, label: m }));

  const { mutate } = useMutation(updateTransaction, {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['sellProgressList'] }),
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SellStatus;
    setValue(value);
    const updated: TransactionExtended = { ...transaction, sellStatus: value };
    mutate(updated);
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
