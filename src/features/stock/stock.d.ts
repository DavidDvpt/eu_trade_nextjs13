type StockState = {
  itemQty: ApiType<number>;
  userStockList: ApiType<UserStocks | null>;
};

type DbUserStock = {
  itemId: string;
  itemName: string;
  itemValue: number;
  transactionType: import('@prisma/client').TransactionType;
  sellStatus: import('@prisma/client').SellStatus;
  count: any;
  quantity: number;
  fee: number;
  totalValue: number;
};
type UserStock = {
  iId: string;
  iName: string;
  iValue;
  quantity: number;
  value: number;
};

type DbUserStocks = DbUserStock[];
type UserStocks = UserStock[];

interface IHomeStockForTable extends UserStock {
  quantity: string;
  value: string;
}

type HomeStockTableRow = Omit<IHomeStockForTable, 'iId' | 'iValue'>;
type HomeStockTableRows = HomeStockTableRow[];
