import { getDistinctValues } from '../src/lib/arrayTools';
import client from './prismadb';

// const userStockList = async () => {
//   const response = await client.$queryRaw`
//   SELECT i.name, t.type, t.sellStatus, COUNT(*) count,SUM(t.quantity) quantity, SUM(t.fee) fee, SUM(t.value) value FROM Transaction t
//   LEFT JOIN Item i
//   ON t.itemId = i.id
//   GROUP BY i.id, t.type, t.sellStatus
//   ORDER BY i.name, t.type, t.sellStatus`;

//   console.table(response);
// };

// userStockList();

// const transactions = async () => {
//   const r = await client.transaction.findMany({
//     where: {
//       userId: 'clgs40jg40005kr9726jsxqrh',
//       itemId: 'clgs40jgq001hkr978p2a4v4j',
//       type: TransactionType.SELL,
//       sellStatus: SellStatus.ENDED,
//     },
//     include: { item: true },
//     orderBy: [{ createdAt: 'desc' }],
//     take: 1,
//   });

//   console.log(r);
// };

// transactions();

const createJunctions = async () => {
  const sessions = await client.session.findMany({
    include: { SessionRows: true },
  });
  const sells = await client.sell.findMany();
  const distinctSellItemId = getDistinctValues(sells.map((m) => m.itemId));

  let distinctCount = 0;

  const request = async (rowId: string, sellId: string, qty: number) => {
    await client.sessionRowSellRelation.create({
      data: {
        sellId: sellId,
        sessionRowId: rowId,
        quantity: qty,
      },
    });
  };
  // loop on distincts
  while (distinctCount < distinctSellItemId.length) {
    const currentBuys = sessions.filter(
      (f) => f.SessionRows[0].itemId === distinctSellItemId[distinctCount]
    );
    const currentSells = sells.filter(
      (f) => f.itemId === distinctSellItemId[distinctCount]
    );

    let sellIndex = 0;
    let currentBuyIndex = 0;
    const currentBuy = currentBuys[currentBuyIndex].SessionRows[0];
    let buyLeft = currentBuy.quantity;

    // loop on distinct item sells
    while (sellIndex < currentSells.length) {
      const cSell = currentSells[sellIndex];

      if (buyLeft >= cSell.quantity) {
        request(currentBuy.id, cSell.id, cSell.quantity);

        if (cSell.status !== 'RETURNED') {
          buyLeft -= cSell.quantity;
        }
      } else {
        let sellLeft = cSell.quantity;
        if (cSell.status === 'RETURNED') {
          let wCurrBuy = currentBuyIndex;

          do {
            const cBuy = currentBuys[wCurrBuy].SessionRows[0];
            let currQty = 0;
            if (cBuy.quantity >= sellLeft) {
              currQty = sellLeft;
            } else {
              currQty -= cBuy.quantity;
              sellLeft -= cBuy.quantity;
              wCurrBuy++;
            }

            request(cBuy.id, cSell.id, currQty);
          } while (sellLeft > 0);
        } else {
          do {
            const cBuy = currentBuys[currentBuyIndex].SessionRows[0];
            let currQty = 0;

            if (cBuy.quantity > sellLeft) {
              currQty = sellLeft;
            } else {
              currQty = cBuy.quantity;
              sellLeft -= cBuy.quantity;
            }

            request(cBuy.id, cSell.id, currQty);
            // fixer l'erreur de reinitialisation et la logique globale
            if (cBuy.quantity >= sellLeft) {
              currQty = sellLeft;
            } else {
              await client.session.update({
                where: { id: cBuy.sessionId },
                data: { state: 'CLOSED' },
              });
              currentBuyIndex++;
            }
          } while (sellLeft > 0);
        }
      }

      sellIndex++;
    }
    distinctCount++;
  }
};

createJunctions();
