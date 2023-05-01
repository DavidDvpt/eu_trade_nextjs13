type TransactionParameters = {
  resourceId?: string;
  type?: import('@prisma/client').TransactionType;
  sellStatus?: import('@prisma/client').SellStatus;
};

type ResourceParameters = { resourceTypeId: string };

type LoadManagerState = {
  resourceType: boolean;
  resourceParams: ResourceParameters | null;
  transaction: TransactionParameters | null;
};
