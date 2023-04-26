import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ResourceState = {
  resources: { status: ApiStatusEnum.IDLE, result: null },
};
const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {},
});

export default resourceSlice.reducer;
