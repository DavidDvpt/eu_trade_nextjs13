interface IStock {
  resourceId: string;
  resourceName: string;
  quantity: number;
  value: number;
}
type Stocks = IStock[];

interface IHomeStockForTable extends IStock {
  value: string;
  quantity: string;
}

type HomeStockTableRow = Omit<IHomeStockForTable, 'resourceId'>;
type HomeStockTableRows = HomeStockTableRow[];
