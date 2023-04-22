type TransactionFormType = {
  resourceId: string;
  quantity: number;
  sellStatus: import('@prisma/client').SellStatus | null;
  fee: number;
  value: internal;
  transactionType: import('@prisma/client').TransactionType | null;
};
