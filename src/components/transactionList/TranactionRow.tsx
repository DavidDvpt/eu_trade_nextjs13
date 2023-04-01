import React from 'react';

interface ITransactionProps {
  row: any;
}
function TransactionRow({ row }: ITransactionProps): React.ReactElement {
  console.log(row);
  return (
    <tr>
      <td>{row.resource.name}</td>
      <td>{row.quantity}</td>
      <td>{row.quantity * row.resource.value}</td>
      <td>{row.value}</td>
    </tr>
  );
}

export default TransactionRow;
