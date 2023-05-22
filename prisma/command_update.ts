// import {
//   Session,
//   SessionContext,
//   SessionState,
//   SessionStatus,
//   TransactionType,
// } from '@prisma/client';
// import client from './prismadb';

import { getDistinctValues } from '@/lib/arrayTools';
import { Transaction, TransactionType } from '@prisma/client';
import client from './prismadb';

// const createSessionsTupples = async () => {
//   const transactions = await client.transaction.findMany();

//   Promise.all(
//     transactions.map((t) => {
//       const isActive =
//         t.type === TransactionType.BUY
//           ? SessionStatus.ACTIVE
//           : SessionStatus.SOLDED;
//       return client.session
//         .create({
//           data: {
//             context: SessionContext.TRADE,
//             status: isActive,
//             state: SessionState.CLOSE,
//           },
//         })
//         .then((response: Session) => {
//           return client.transaction
//             .update({ where: { id: t.id }, data: { sessionId: response.id } })
//             .then(() => {
//               console.log('update ' + t.id + ' ok');
//             });
//         });
//     })
//   );
// };

// createSessionsTupples();

const createTransactiosnRelations = async () => {
  const buyTransactions = client.transaction.findMany({
    where: { type: TransactionType.BUY },
    orderBy: [{ createdAt: 'asc' }],
  });

  buyTransactions.then(async (buys: Transaction[]) => {
    const distinctItems = getDistinctValues(buys.map((m) => m.itemId));
    const sellLeft = 0;

    const request = async (iid: string, oid: string, qty: number) => {
      await client.transactionRelation.create({
        data: {
          inId: iid,
          outId: oid,
          quantity: qty,
        },
      });
    };

    for (let i = 0; i < distinctItems.length; i++) {
      const singleItemBuys = buys.filter((f) => f.itemId === distinctItems[i]);
      let selectedBuy = 0;
      let buyLeft = singleItemBuys[selectedBuy].quantity;

      const sells = await client.transaction.findMany({
        where: { type: TransactionType.SELL, itemId: distinctItems[i] },
      });

      for (let i = 0; i < sells.length; i++) {
        const e = sells[i];
        if (buyLeft >= e.quantity) {
          request(singleItemBuys[selectedBuy].id, e.id, e.quantity);
          buyLeft -= e.quantity;
        } else {
          let sellLeft = e.quantity - buyLeft;
          request(singleItemBuys[selectedBuy].id, e.id, buyLeft);
          selectedBuy++;
          buyLeft = singleItemBuys[selectedBuy].quantity;

          while (sellLeft > 0) {
            if (buyLeft >= sellLeft) {
              request(singleItemBuys[selectedBuy].id, e.id, sellLeft);
              buyLeft -= sellLeft;
              sellLeft = 0;
            } else {
              request(singleItemBuys[selectedBuy].id, e.id, buyLeft);
              sellLeft = sellLeft - buyLeft;
              selectedBuy++;
              buyLeft = singleItemBuys[selectedBuy].quantity;
            }
          }
        }
      }
    }
  });
};

createTransactiosnRelations();
