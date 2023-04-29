type TransactionState = {
  transactions: ApiType<
    import('@/app/extendedAppTypes').TransactionsExtended | null
  >;
  mutateStatus: import('@/lib/axios/apiTypes').ApiStatusEnum;
};

interface IFetchTransactionsParams {
  type?: TransactionType;
  sellStatus?: SellStatus;
  resourceId?: string;
}
