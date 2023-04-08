import { TransactionExtended } from '@/app/extendedAppTypes';
import React from 'react';

interface ITransactionProps {
  row: TransactionExtended;
}
function TransactionRow({ row }: ITransactionProps): React.ReactElement {
  const tt = row.quantity * row.resource.value;

  return (
    <tr>
      <td>{new Date(row.createdAt).toLocaleDateString('fr-FR')}</td>
      <td>{row.resource.name}</td>
      <td>{row.quantity}</td>
      <td>{Number(tt).toFixed(2)}</td>
      <td>{row.value}</td>
      <td>{Number(row.value - tt).toFixed(2)}</td>
      <td>{tt > 0 ? Number((row.value / tt) * 100).toFixed(2) : '-'}</td>
    </tr>
  );
}

export default TransactionRow;
