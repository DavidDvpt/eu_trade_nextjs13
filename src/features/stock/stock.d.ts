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

// interface IStock {
//   resourceId: string;
//   resourceName: string;
//   quantity: number;
//   value: number;
// }
// type Stocks = IStock[];
