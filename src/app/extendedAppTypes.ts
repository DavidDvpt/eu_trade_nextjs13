import { Item, Transaction } from '@prisma/client';

export type TransactionExtended = Transaction & {
  item: Item;
};
export type TransactionsExtended = TransactionExtended[];
