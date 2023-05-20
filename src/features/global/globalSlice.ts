import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/storeTypes';

const initialState: GlobalState = { reload: [] };
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addReload: (state, action: PayloadAction<string | string[]>) => {
      const ap = action.payload;

      state.reload = state.reload.concat(typeof ap === 'string' ? ap : [...ap]);
    },
    removeReload: (state, action: PayloadAction<string | string[]>) => {
      const ap = action.payload;
      state.reload = state.reload.filter((f) =>
        typeof ap === 'string' ? f !== ap : !action.payload.includes(f)
      );
    },
  },
});

export default globalSlice.reducer;
export const globalActions = globalSlice.actions;
export const getGlobalState = (state: RootState) => state.global;
