import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchResourceTypesThunk } from './resourceTypeThunks';

const initialState: ResourceTypeState = {
  resourceTypes: { status: ApiStatusEnum.IDLE, result: null, error: null },
};

const resourceTypeSlice = createSlice({
  name: 'resourceType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceTypesThunk.pending, (state) => {
        state.resourceTypes.status = ApiStatusEnum.PENDING;
        state.resourceTypes.result = null;
        state.resourceTypes.error = null;
      })
      .addCase(
        fetchResourceTypesThunk.fulfilled,
        (state, action: PayloadAction<ResourceTypes>) => {
          state.resourceTypes.status = ApiStatusEnum.IDLE;
          state.resourceTypes.result = action.payload;
          state.resourceTypes.error = null;
        }
      )
      .addCase(
        fetchResourceTypesThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.resourceTypes.status = ApiStatusEnum.REJECTED;
          state.resourceTypes.result = null;
          state.resourceTypes.error = action.payload;
        }
      );
  },
});

export default resourceTypeSlice.reducer;
// export const getResourceTypesState = (state: RootState) => state.resourceType;
