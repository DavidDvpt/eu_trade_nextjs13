import {
  TransactionExtended,
  TransactionsExtended,
} from '@/app/extendedAppTypes';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import {
  fetchTransactionsThunk,
  postTransactionThunk,
} from './transactionThunks';

const initialState: TransactionState = {
  transactions: { status: ApiStatusEnum.IDLE, result: null, error: null },
  mutateStatus: { status: ApiStatusEnum.IDLE, result: null, error: null },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { reset: () => initialState },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.transactions.status = ApiStatusEnum.PENDING;
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
          state.transactions.error = action.payload;
        }
      )
      .addCase(postTransactionThunk.pending, (state) => {
        state.mutateStatus.status = ApiStatusEnum.PENDING;
        state.mutateStatus.result = null;
        state.mutateStatus.error = null;
      })
      .addCase(
        postTransactionThunk.fulfilled,
        (state, action: PayloadAction<TransactionExtended>) => {
          state.mutateStatus.status = ApiStatusEnum.PENDING;
          state.mutateStatus.result = action.payload;
          state.mutateStatus.error = null;
        }
      )
      .addCase(
        postTransactionThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.mutateStatus.status = ApiStatusEnum.PENDING;
          state.mutateStatus.result = null;
          state.mutateStatus.error = action.payload;
        }
      );
  },
});

export default transactionSlice.reducer;
export const transactionActions = transactionSlice.actions;
export const getTransactionState = (state: RootState) => state.transaction;
