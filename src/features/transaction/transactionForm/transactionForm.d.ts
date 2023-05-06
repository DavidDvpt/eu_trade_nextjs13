type TransactionFormType = {
  resourceId: string;
  quantity: number;
  context: import('@prisma/client').ContextType | null;
  sellStatus: import('@prisma/client').SellStatus | null;
  fee: number;
  value: number;
  transactionType: import('@prisma/client').TransactionType | null;
};
