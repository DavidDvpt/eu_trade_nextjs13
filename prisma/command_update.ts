// import {
//   Session,
//   SessionContext,
//   SessionState,
//   SessionStatus,
//   TransactionType,
// } from '@prisma/client';
// import client from './prismadb';

import { TransactionsExtended } from '@/app/extendedAppTypes';
import {
  SellStatus,
  SessionStatus,
  Transaction,
  TransactionType,
} from '@prisma/client';
import { getDistinctValues } from '../src/lib/arrayTools';
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
    include: { item: true },
    orderBy: [{ createdAt: 'asc' }],
  });

  buyTransactions.then(async (buys: TransactionsExtended) => {
    const distinctItems = getDistinctValues(buys.map((m) => m.itemId));

    const request = async (iid: string, oid: string, qty: number) => {
      await client.transactionRelation.create({
        data: {
          inId: iid,
          outId: oid,
          quantity: qty,
        },
      });
    };

    const soldCurrentSell = async (
      e: Transaction,
      itemBuy: Transaction,
      bLeft: number,
      sessionId: string
    ) => {
      request(itemBuy.id, e.id, bLeft);

      await client.session.update({
        where: { id: sessionId as string },
        data: {
          status: SessionStatus.SOLDED,
        },
      });
    };

    // loop on distinct items
    for (let i = 0; i < distinctItems.length; i++) {
      const singleItemBuys = buys.filter((f) => f.itemId === distinctItems[i]);
      let selectedBuy = 0;
      let buyLeft = singleItemBuys[selectedBuy].quantity;

      const sells = await client.transaction.findMany({
        where: { sellStatus: SellStatus.ENDED, itemId: distinctItems[i] },
      });

      // loop on sells by item
      for (let i = 0; i < sells.length; i++) {
        const s = sells[i];

        if (buyLeft >= s.quantity) {
          // console.log('buyLeft', buyLeft, 'qty', s.quantity);
          request(singleItemBuys[selectedBuy].id, s.id, s.quantity);
          buyLeft -= s.quantity;
        } else {
          soldCurrentSell(
            s,
            singleItemBuys[selectedBuy],
            buyLeft,
            buys[selectedBuy].sessionId as string
          );
          let sellLeft = s.quantity - buyLeft;
          // console.log(
          //   'buyLeft',
          //   buyLeft,
          //   'sellLeft',
          //   sellLeft,
          //   'qty',
          //   s.quantity
          // );
          selectedBuy++;
          buyLeft = singleItemBuys[selectedBuy].quantity;

          while (sellLeft > 0) {
            if (buyLeft >= sellLeft) {
              request(singleItemBuys[selectedBuy].id, s.id, sellLeft);
              buyLeft -= sellLeft;
              sellLeft = 0;
              console.log(
                'buyLeft',
                buyLeft,
                'sellLeft',
                sellLeft,
                'qty',
                s.quantity
              );
            } else {
              soldCurrentSell(
                s,
                singleItemBuys[selectedBuy],
                buyLeft,
                buys[selectedBuy].sessionId as string
              );
              sellLeft -= buyLeft;
              // console.log(
              //   'buyLeft',
              //   buyLeft,
              //   'sellLeft',
              //   sellLeft,
              //   'qty',
              //   s.quantity
              // );
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
