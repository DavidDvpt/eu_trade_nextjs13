import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import {
  fetchItemQuantityThunk,
  fetchSimpleStockListThunk,
} from './stockThunks';

const initialState: StockState = {
  itemQty: { status: ApiStatusEnum.IDLE, result: 0, error: null },
  simpleStockList: { status: ApiStatusEnum.IDLE, result: null, error: null },
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
