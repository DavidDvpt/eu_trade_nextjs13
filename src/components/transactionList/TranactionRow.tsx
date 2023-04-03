import { TransactionExtended } from '@/app/extendedAppTypes';
import React from 'react';

interface ITransactionProps {
  row: TransactionExtended;
}
function TransactionRow({ row }: ITransactionProps): React.ReactElement {
  console.log(row);
  const tt = row.quantity * row.resource.value;
  return (
    <tr>
      <td>{row.resource.name}</td>
      <td>{row.quantity}</td>
      <td>{tt}</td>
      <td>{row.value}</td>
      <td>{row.value - tt}</td>
      <td>{tt > 0 ? Number((row.value / tt) * 100).toFixed(2) : '-'}</td>
    </tr>
  );
}

export default TransactionRow;
