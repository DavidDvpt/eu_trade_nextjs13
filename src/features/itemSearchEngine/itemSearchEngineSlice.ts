import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';
import {
  fetchItemCategoriesThunk,
  fetchItemTypesThunk,
  fetchItemsThunk,
} from './itemSearchEngineThunks';

const initialState: ItemSearchEngineState = {
  itemCategories: { status: ApiStatusEnum.IDLE, result: null, error: null },
  selectedItemCategory: null,
  itemTypes: { status: ApiStatusEnum.IDLE, result: null, error: null },
  selectedItemType: null,
  items: { status: ApiStatusEnum.IDLE, result: null, error: null },
  selectedItem: null,
};
const itemSearchEngineSlice = createSlice({
  name: 'itemSearchEngine',
  initialState,
  reducers: {
    setSelectedItemCategory: (state, action: PayloadAction<string>) => {
      state.selectedItemCategory =
        state.itemCategories.result?.find((f) => f.id === action.payload) ??
        null;
    },
    setSelectedItemType: (state, action: PayloadAction<string>) => {
      state.selectedItemType =
        state.itemTypes.result?.find((f) => f.id === action.payload) ?? null;
    },
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItem =
        state.items.result?.find((f) => f.id === action.payload) ?? null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchItemCategoriesThunk.pending, (state) => {
        state.itemCategories.status = ApiStatusEnum.PENDING;
        state.itemCategories.error = null;
      })
      .addCase(
        fetchItemCategoriesThunk.fulfilled,
        (state, action: PayloadAction<ItemCategories>) => {
          state.itemCategories.status = ApiStatusEnum.IDLE;
          state.itemCategories.result = action.payload;
          state.itemCategories.error = null;
        }
      )
      .addCase(
        fetchItemCategoriesThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.itemCategories.status = ApiStatusEnum.REJECTED;
          state.itemCategories.result = null;
          state.itemCategories.error = action.payload;
        }
      )
      .addCase(fetchItemTypesThunk.pending, (state) => {
        state.itemTypes.status = ApiStatusEnum.PENDING;
        state.itemTypes.error = null;
      })
      .addCase(
        fetchItemTypesThunk.fulfilled,
        (state, action: PayloadAction<ItemTypes>) => {
          state.itemTypes.status = ApiStatusEnum.IDLE;
          state.itemTypes.result = action.payload;
          state.itemTypes.error = null;
        }
      )
      .addCase(
        fetchItemTypesThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.itemTypes.status = ApiStatusEnum.REJECTED;
          state.itemTypes.result = null;
          state.itemTypes.error = action.payload;
        }
      )
      .addCase(fetchItemsThunk.pending, (state) => {
        state.items.status = ApiStatusEnum.PENDING;
        state.items.error = null;
      })
      .addCase(
        fetchItemsThunk.fulfilled,
        (state, action: PayloadAction<Items>) => {
          state.items.status = ApiStatusEnum.IDLE;
          state.items.result = action.payload;
          state.items.error = null;
        }
      )
      .addCase(
        fetchItemsThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.items.status = ApiStatusEnum.REJECTED;
          state.items.result = null;
          state.items.error = action.payload;
        }
      ),
});

export default itemSearchEngineSlice.reducer;
export const getItemSearchEngineState = (state: RootState) =>
  state.itemSearchEngine;
export const itemSearchEngineActions = itemSearchEngineSlice.actions;
