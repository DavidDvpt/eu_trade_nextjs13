interface TransactionListRow {
  date: string;
  name: string;
  quantity: number;
  ttCost: number;
  ttcCost: number;
  extraCost: number;
  markup: number;
}
interface TransactionListRowForTable extends TransactionListRow {
  ttCost: string;
  extraCost: string;
  markup: string;
}

type TransactionListRows = TransactionListRow[];
type TransactionListRowsForTable = TransactionListRowForTable[];
