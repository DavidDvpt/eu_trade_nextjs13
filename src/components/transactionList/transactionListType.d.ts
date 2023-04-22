interface TransactionRow {
  date: string;
  name: '';
  quantity: number;
  ttCost: number;
  ttcCost: number;
  extraCost: number;
  markup: number;
}
interface TransactionRowForTable extends TransactionRow {
  name: string;
  quantity: string;
  ttCost: string;
  ttcCost: string;
  extraCost: string;
  markup: string;
}

type TransactionListRows = TransactionRow[];
type TransactionRowsForTable = TransactionRowForTable[];
