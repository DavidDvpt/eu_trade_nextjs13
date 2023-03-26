type BuyFormType = {
  resourceId: string;
  quantity: number;
  buyValue: internal;
  userId: string;
  transactionType: import('@prisma/client').TransactionType;
};

type CalcylatedValuesType = {
  resourceName: string;
  calculatedTT: number;
  calculatedExtraCost: number;
};
