interface IHomeStockForTable extends IStock {
  value: string;
  quantity: string;
}

type HomeStockTableRow = Omit<IHomeStockForTable, 'resourceId'>;
type HomeStockTableRows = HomeStockTableRow[];
