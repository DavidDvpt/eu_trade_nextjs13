import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import { fetchItemQuantityThunk, fetchUserStockListThunk } from './stockThunks';

const initialState: StockState = {
  itemQty: { status: ApiStatusEnum.IDLE, result: 0, error: null },
  userStockList: { status: ApiStatusEnum.IDLE, result: null, error: null },
};
const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    singleQtyReset: (state) => {
      state.itemQty = {
        status: ApiStatusEnum.IDLE,
        result: 0,
        error: null,
      };
    },
    singleQtyAdd: (state, action: PayloadAction<number>) => {
      state.itemQty.result = state.itemQty.result + action.payload;
    },
    singleQtySubstract: (state, action: PayloadAction<number>) => {
      state.itemQty.result = state.itemQty.result - action.payload;
    },
    userStockListReset: (state) => {
      state.userStockList = {
        status: ApiStatusEnum.IDLE,
        result: null,
        error: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItemQuantityThunk.pending, (state) => {
        state.itemQty.status = ApiStatusEnum.PENDING;
        state.itemQty.result = 0;
        state.itemQty.error = null;
      })
      .addCase(
        fetchItemQuantityThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.itemQty.status = ApiStatusEnum.IDLE;
          state.itemQty.result = action.payload;
          state.itemQty.error = null;
        }
      )
      .addCase(
        fetchItemQuantityThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.itemQty.status = ApiStatusEnum.REJECTED;
          state.itemQty.result = 0;
          state.itemQty.error = action.payload;
        }
      );
    builder
      .addCase(fetchUserStockListThunk.pending, (state) => {
        state.userStockList.status = ApiStatusEnum.PENDING;
        state.userStockList.error = null;
      })
      .addCase(
        fetchUserStockListThunk.fulfilled,
        (state, action: PayloadAction<UserStocks>) => {
          state.userStockList.status = ApiStatusEnum.IDLE;
          state.userStockList.result = action.payload;
          state.userStockList.error = null;
        }
      )
      .addCase(
        fetchUserStockListThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.userStockList.status = ApiStatusEnum.REJECTED;
          state.userStockList.result = null;
          state.userStockList.error = action.payload;
        }
      );
  },
});

export default stockSlice.reducer;
export const stockActions = stockSlice.actions;
export const getStockState = (state: RootState) => state.stock;
