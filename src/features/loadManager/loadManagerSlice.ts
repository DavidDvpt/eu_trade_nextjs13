import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';

const initialState: LoadManagerState = {
  resourceType: true,
  resourceParams: null,
  transactionParams: null,
};
const loadManagerSlice = createSlice({
  name: 'loadManager',
  initialState,
  reducers: {
    setResourceType: (state, action: PayloadAction<boolean>) => {
      state.resourceType = action.payload;
    },
    setResource: (state, action: PayloadAction<ResourceParameters | null>) => {
      state.resourceParams = action.payload;
    },
    setTransaction: (
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
