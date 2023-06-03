import {
  Session,
  SessionContext,
  SessionState,
  SessionStatus,
  TransactionType,
} from '@prisma/client';
import client from './prismadb';

const createSessionsTupples = async () => {
  const transactions = await client.transaction.findMany();

  Promise.all(
    transactions.map((t) => {
      const isActive =
        t.type === TransactionType.BUY
          ? SessionStatus.ACTIVE
          : SessionStatus.SOLDED;
      return client.session
        .create({
          data: {
            context: SessionContext.TRADE,
            status: isActive,
            state: SessionState.CLOSE,
          },
        })
        .then((response: Session) => {
          return client.transaction
            .update({ where: { id: t.id }, data: { sessionId: response.id } })
            .then(() => {
              console.log('update ' + t.id + ' ok');
            });
        });
    })
  );
};

createSessionsTupples();
