import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import {
  fetchSimpleStockListThunk,
  fetchSingleItemQuantityThunk,
} from './stockThunks';

const initialState: StockState = {
  singleItemQty: { status: ApiStatusEnum.IDLE, result: 0, error: null },
  simpleStockList: { status: ApiStatusEnum.IDLE, result: null, error: null },
};
const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    singleQtyAdd: (state, action: PayloadAction<number>) => {
      state.singleItemQty.result = state.singleItemQty.result + action.payload;
    },
    singleQtySubstract: (state, action: PayloadAction<number>) => {
      state.singleItemQty.result = state.singleItemQty.result - action.payload;
    },
    simpleStockListReset: (state) => {
      state.simpleStockList = {
        status: ApiStatusEnum.IDLE,
        result: null,
        error: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSingleItemQuantityThunk.pending, (state) => {
        state.singleItemQty.status = ApiStatusEnum.PENDING;
        state.singleItemQty.result = 0;
        state.singleItemQty.error = null;
      })
      .addCase(
        fetchSingleItemQuantityThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.singleItemQty.status = ApiStatusEnum.IDLE;
          state.singleItemQty.result = action.payload;
          state.singleItemQty.error = null;
        }
      )
      .addCase(
        fetchSingleItemQuantityThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.singleItemQty.status = ApiStatusEnum.REJECTED;
          state.singleItemQty.result = 0;
          state.singleItemQty.error = action.payload;
        }
      )
      .addCase(fetchSimpleStockListThunk.pending, (state) => {
        state.simpleStockList.status = ApiStatusEnum.PENDING;
        state.simpleStockList.error = null;
      })
      .addCase(
        fetchSimpleStockListThunk.fulfilled,
        (state, action: PayloadAction<SimpleStocks>) => {
          state.simpleStockList.status = ApiStatusEnum.IDLE;
          state.simpleStockList.result = action.payload;
          state.simpleStockList.error = null;
        }
      )
      .addCase(
        fetchSimpleStockListThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.simpleStockList.status = ApiStatusEnum.REJECTED;
          state.simpleStockList.result = null;
          state.simpleStockList.error = action.payload;
        }
      );
  },
});

export default stockSlice.reducer;
export const stockActions = stockSlice.actions;
export const getStockState = (state: RootState) => state.stock;
