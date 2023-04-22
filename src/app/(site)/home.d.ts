interface IStock {
  resourceId: string;
  resourceName: string;
  quantity: number;
  value: number;
}
type Stocks = IStock[];

interface IStockForTable extends IStock {
  value: string;
  quantity: string;
}

type HomeStockTableRow = Omit<IStockForTable, 'resourceId'>;
type HomeStockTableRows = HomeStockTableRow[];
