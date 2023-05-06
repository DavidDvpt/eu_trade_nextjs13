type TransactionParameters = {
  resourceId?: string;
  context?: import('@prisma/client').ContextType;
  type?: import('@prisma/client').TransactionType;
  sellStatus?: import('@prisma/client').SellStatus;
};

type ResourceParameters = { resourceTypeId: string };

type LoadManagerState = {
  resourceType: boolean;
  resourceParams: ResourceParameters | null;
  transactionParams: TransactionParameters | null;
};
