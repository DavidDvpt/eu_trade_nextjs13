type SimpleStock = {
  resourceId: string;
  name: string;
  quantity: number;
  price: number;
};
type SimpleStocks = SimpleStock[];

type StockState = {
  singleResourceQty: ApiType<number>;
  simpleStockList: ApiType<SimpleStocks | null>;
};

interface IHomeStockForTable extends SimpleStock {
  quantity: string;
  price: string;
}

type HomeStockTableRow = Omit<IHomeStockForTable, 'resourceId'>;
type HomeStockTableRows = HomeStockTableRow[];
