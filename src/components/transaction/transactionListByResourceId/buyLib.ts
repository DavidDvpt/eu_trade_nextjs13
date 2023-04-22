import { TransactionExtended } from '@/app/extendedAppTypes';

export const buyRowParser = (
  e: TransactionExtended,
  ttCost: number
): TransactionRowForTable => {
  const parsedRow: TransactionRowForTable = {
    date: new Date(e.createdAt).toLocaleDateString('fr-FR'),
    name: e.resource.name,
    quantity: e.quantity.toString(),
    ttCost: Number(ttCost).toFixed(2),
    ttcCost: Number(e.value).toFixed(2),
    extraCost: Number(e.value - ttCost).toFixed(2),
    markup: ttCost > 0 ? Number((e.value / ttCost) * 100).toFixed(2) : '-',
  };

  return parsedRow;
};

export const buyFooterRowParser = (
  row: TransactionRow
): TransactionRowForTable => {
  const parsedRow = {
    ...row,
    quantity: String(row.quantity),
    ttCost: Number(row.ttCost).toFixed(2),
    ttcCost: Number(row.ttcCost).toFixed(2),
    extraCost: Number(row.extraCost).toFixed(2),
    markup:
      row.ttCost > 0
        ? Number((row.ttcCost / row.ttCost) * 100).toFixed(2)
        : '-',
  };

  return parsedRow;
};
