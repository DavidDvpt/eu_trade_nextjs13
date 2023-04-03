import { Resource, Transaction } from '@prisma/client';

export type TransactionExtended = Transaction & {
  resource: Resource;
};
export type TransactionsExtended = TransactionExtended[];
