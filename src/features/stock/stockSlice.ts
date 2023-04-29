import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import {
  fetchSimpleStockListThunk,
  fetchSingleResourceQuantity,
} from './stockThunks';

const initialState: StockState = {
  singleResourceQty: { status: ApiStatusEnum.IDLE, result: 0, error: null },
  simpleStockList: { status: ApiStatusEnum.IDLE, result: null, error: null },
};
const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    singleQtyAdd: (state, action: PayloadAction<number>) => {
      state.singleResourceQty.result =
        state.singleResourceQty.result + action.payload;
    },
    singleQtySubstract: (state, action: PayloadAction<number>) => {
      state.singleResourceQty.result =
        state.singleResourceQty.result - action.payload;
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
      .addCase(fetchSingleResourceQuantity.pending, (state) => {
        state.singleResourceQty.status = ApiStatusEnum.PENDING;
        state.singleResourceQty.result = 0;
        state.singleResourceQty.error = null;
      })
      .addCase(
        fetchSingleResourceQuantity.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.singleResourceQty.status = ApiStatusEnum.IDLE;
          state.singleResourceQty.result = action.payload;
          state.singleResourceQty.error = null;
        }
      )
      .addCase(
        fetchSingleResourceQuantity.rejected,
        (state, action: PayloadAction<any>) => {
          state.singleResourceQty.status = ApiStatusEnum.REJECTED;
          state.singleResourceQty.result = 0;
          state.singleResourceQty.error = action.payload;
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
