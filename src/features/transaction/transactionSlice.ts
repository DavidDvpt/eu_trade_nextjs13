import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTransactionsGlobalProfitThunk } from './transactionThunks';

const initialState: TransactionState = {
  transactions: { status: ApiStatusEnum.IDLE, result: null, error: null },
  transactionProfit: { status: ApiStatusEnum.IDLE, result: null, error: null },
  mutateStatus: { status: ApiStatusEnum.IDLE, result: null, error: null },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { reset: () => initialState },
  extraReducers(builder) {
    builder

      .addCase(fetchTransactionsGlobalProfitThunk.pending, (state) => {
        state.transactionProfit.status = ApiStatusEnum.PENDING;
        state.transactionProfit.error = null;
      })
      .addCase(
        fetchTransactionsGlobalProfitThunk.fulfilled,
        (state, action: PayloadAction<TransactionBenefitResult>) => {
          state.transactionProfit.status = ApiStatusEnum.PENDING;
          state.transactionProfit.result = action.payload;
          state.transactionProfit.error = null;
        }
      )
      .addCase(
        fetchTransactionsGlobalProfitThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.transactionProfit.status = ApiStatusEnum.PENDING;
          state.transactionProfit.result = null;
          state.transactionProfit.error = action.payload;
        }
      );
  },
});

export default transactionSlice.reducer;
export const transactionActions = transactionSlice.actions;
// export const getTransactionState = (state: RootState) => state.transaction;
