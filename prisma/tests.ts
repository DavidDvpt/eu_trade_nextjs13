import client from '../src/lib/prisma/prismadb';

export const getStockLeft = async (value: string) => {
  const response = await client.transaction.groupBy({
    by: ['type', 'sellStatus', 'resourceId'],
    _sum: {
      quantity: true,
    },
    where: { resourceId: value },
  });

  let stock = 0;
  response.forEach((e) => {
    if (e.type === 'BUY') {
      stock += e._sum.quantity ?? 0;
    }
    if (e.type === 'SELL' && e.sellStatus !== 'RETURNED') {
      stock -= e._sum.quantity ?? 0;
    }
  });
  console.table(response);
  console.log(stock);
};

getStockLeft('clg87cpgc000spt1mbwfhwlw8');
