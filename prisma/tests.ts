import { SellStatus, TransactionType } from '@prisma/client';
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

// userStockList();

const transactions = async () => {
  const r = await client.transaction.findMany({
    where: {
      userId: 'clgs40jg40005kr9726jsxqrh',
      itemId: 'clgs40jgq001hkr978p2a4v4j',
      type: TransactionType.SELL,
      sellStatus: SellStatus.ENDED,
    },
    include: { item: true },
    orderBy: [{ createdAt: 'desc' }],
    take: 1,
  });

  console.log(r);
};

transactions();
