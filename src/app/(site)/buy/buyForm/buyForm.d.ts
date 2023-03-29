type BuyFormType = {
  resourceId: string;
  quantity: number;
  buyValue: internal;
  userId: string;
  transactionType: import('@prisma/client').TransactionType;
};

type BuyFormCalculatedValues = {
  calculatedTT: number;
  calculatedExtraCost: number;
  costPercentage: number;
};
