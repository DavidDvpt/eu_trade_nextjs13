import { TransactionsExtended } from '@/app/extendedAppTypes';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import { fetchTransactionsThunk } from './transactionThunks';

const initialState: TransactionState = {
  transactions: { status: ApiStatusEnum.IDLE, result: null, error: null },
  mutateStatus: ApiStatusEnum.IDLE,
};
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { reset: () => initialState },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.transactions.status = ApiStatusEnum.PENDING;
        state.transactions.result = null;
        state.transactions.error = null;
      })
      .addCase(
        fetchTransactionsThunk.fulfilled,
        (state, action: PayloadAction<TransactionsExtended>) => {
          state.transactions.status = ApiStatusEnum.IDLE;
          state.transactions.result = action.payload;
          state.transactions.error = null;
        }
      )
      .addCase(
        fetchTransactionsThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.transactions.status = ApiStatusEnum.REJECTED;
          state.transactions.result = null;
          state.transactions.error = action.payload;
        }
      );
  },
});

export default transactionSlice.reducer;
export const transactionActions = transactionSlice.actions;
export const getTransactionState = (state: RootState) => state.transaction;
