type TransactionState = {
  transactions: ApiType<
    import('@/app/extendedAppTypes').TransactionsExtended | null
  >;
  transactionProfit: ApiType<TransactionBenefitResult | null>;
  mutateStatus: ApiType<
    import('@/app/extendedAppTypes').TransactionExtended | null
  >;
};

interface IFetchTransactionsParams {
  type?: TransactionType;
  sellStatus?: SellStatus;
  resourceId?: string;
}

interface TransactionRow {
  date: string;
  name: '';
  context: '';
  quantity: number;
  ttCost: number;
  fee?: number;
  ttcCost: number;
  extraCost: number;
  markup: number;
}
interface TransactionRowForTable extends TransactionRow {
  name: string;
  context: string;
  quantity: string;
  ttCost: string;
  fee?: string;
  ttcCost: string;
  extraCost: string;
  markup: string;
}

type TransactionRows = TransactionRow[];
type TransactionRowsForTable = TransactionRowForTable[];
