import client from './prismadb';

const userStockList = async () => {
  const response = await client.$queryRaw`
  SELECT i.name, t.type, t.sellStatus, COUNT(*) count,SUM(t.quantity) quantity, SUM(t.fee) fee, SUM(t.value) value FROM Transaction t
  LEFT JOIN Item i
  ON t.itemId = i.id
  GROUP BY i.id, t.type, t.sellStatus
  ORDER BY i.name, t.type, t.sellStatus`;

  console.table(response);
};

userStockList();
