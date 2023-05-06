import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';

const initialState: LoadManagerState = {
  resourceTypeLoad: true,
  resourceParams: null,
  transactionParams: null,
};
const loadManagerSlice = createSlice({
  name: 'loadManager',
  initialState,
  reducers: {
    setResourceTypeLoad: (state, action: PayloadAction<boolean>) => {
      state.resourceTypeLoad = action.payload;
    },
    setResourceParams: (
      state,
      action: PayloadAction<ResourceParameters | null>
    ) => {
      state.resourceParams = action.payload;
    },
    setTransactionParams: (
      state,
      action: PayloadAction<TransactionParameters | null>
    ) => {
      state.transactionParams = action.payload;
    },
  },
});

export default loadManagerSlice.reducer;
export const loadManagerActions = loadManagerSlice.actions;
export const getLoadManagerState = (state: RootState) => state.loadManager;
