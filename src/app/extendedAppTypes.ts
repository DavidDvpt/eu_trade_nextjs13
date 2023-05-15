import { Item, Transaction } from '@prisma/client';

export type TransactionExtended = Transaction & {
  Item: Item;
};
export type TransactionsExtended = TransactionExtended[];
