// import {
//   Session,
//   SessionContext,
//   SessionState,
//   SessionStatus,
//   TransactionType,
// } from '@prisma/client';
// import client from './prismadb';

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
  });
  const sellTransactions = await client.transaction.findMany({
    where: { type: TransactionType.SELL },
  });

  buyTransactions.then(async (buys: Transaction[]) => {
    let buyLeft = 0;
    const sellLeft = 0;

    for (let i = 0; i < buys.length; i++) {
      const bt = buys[i];
      const sells = sellTransactions.filter((f) => f.itemId === bt.itemId);
      let sellIndex = 0;

      while (buyLeft > 0) {
        const s = sells[sellIndex];
        // faire constante sellLeft ou s.quantity pour faire que if/else
        if (sellLeft > 0 && buyLeft >= sellLeft) {
          await client.transactionRelation.create({
            data: {
              inId: bt.id,
              outId: s.id,
              quantity: s.quantity,
            },
          });
          buyLeft -= s.quantity;
          sellIndex++;
        } else if (buyLeft >= s.quantity) {
          await client.transactionRelation.create({
            data: {
              inId: bt.id,
              outId: s.id,
              quantity: s.quantity,
            },
          });
          buyLeft -= s.quantity;
          sellIndex++;
        } else {
          await client.transactionRelation.create({
            data: {
              inId: bt.id,
              outId: s.id,
              quantity: buyLeft,
            },
          });
          buyLeft = 0;
        }
      }
    }
  });
};

createTransactiosnRelations();
