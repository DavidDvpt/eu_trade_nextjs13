import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store/storeTypes';
import { fetchResourcesByTypeIdThunk } from './resourceThunks';

const initialState: ResourceState = {
  resources: { status: ApiStatusEnum.IDLE, result: null, error: null },
};
const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourcesByTypeIdThunk.pending, (state) => {
        state.resources.status = ApiStatusEnum.PENDING;
        state.resources.result = null;
        state.resources.error = null;
      })
      .addCase(
        fetchResourcesByTypeIdThunk.fulfilled,
        (state, action: PayloadAction<Resources>) => {
          state.resources.status = ApiStatusEnum.IDLE;
          state.resources.result = action.payload;
          state.resources.error = null;
        }
      )
      .addCase(
        fetchResourcesByTypeIdThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.resources.status = ApiStatusEnum.REJECTED;
          state.resources.result = null;
          state.resources.error = action.payload;
        }
      );
  },
});

export default resourceSlice.reducer;
export const getResourcesState = (state: RootState) => state.resource;
