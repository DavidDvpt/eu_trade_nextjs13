import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ResourceState = {
  resources: { status: ApiStatusEnum.IDLE, result: null },
};

const resourceTypeSlice = createSlice({
  name: 'resourceType',
  initialState,
  reducers: {},
});

export default resourceTypeSlice.reducer;
