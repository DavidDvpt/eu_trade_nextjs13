import { TransactionExtended } from '@/app/extendedAppTypes';

export const transactionRowParser = (
  e: TransactionExtended,
  ttCost: number
): TransactionRowForTable => {
  const parsedRow: TransactionRowForTable = {
    date: new Date(e.createdAt).toLocaleDateString('fr-FR'),
    name: e.resource.name,
    quantity: e.quantity.toString(),
    ttCost: Number(ttCost).toFixed(2),
    fee: Number(e.fee ?? 0).toFixed(2),
    ttcCost: Number(e.value).toFixed(2),
    extraCost: Number(e.value - ttCost - (e.fee ?? 0)).toFixed(2),
    markup: ttCost > 0 ? Number((e.value / ttCost) * 100).toFixed(2) : '-',
  };

  if (e.fee) parsedRow.fee = Number(e.fee).toFixed(2);

  return parsedRow;
};

export const transactionFooterRowParser = (
  row: TransactionRow
): TransactionRowForTable => {
  const parsedRow: TransactionRowForTable = {
    ...row,
    quantity: String(row.quantity),
    fee: undefined,
    ttCost: Number(row.ttCost).toFixed(2),
    ttcCost: Number(row.ttcCost).toFixed(2),
    extraCost: Number(row.extraCost).toFixed(2),
    markup:
      row.ttCost > 0
        ? Number((row.ttcCost / row.ttCost) * 100).toFixed(2)
        : '-',
  };

  if (row.fee) parsedRow.fee = Number(row.fee).toFixed(2);

  return parsedRow;
};
