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
  context?: import('@prisma/client').ContextType;
  resourceId?: string;
  sellStatus?: import('@prisma/client').SellStatus;
  transactionType?: import('@prisma/client').TransactionType;
  sortKey?: keyof import('@prisma/client').Transaction;
  order?: sortOrder;
  limit?: number;
}

type PostTransactionBody = {
  resourceId: string;
  quantity: number;
  context: import('@prisma/client').ContextType;
  sellStatus: import('@prisma/client').SellStatus | null;
  fee: number;
  value: number;
  transactionType: import('@prisma/client').TransactionType;
};
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
