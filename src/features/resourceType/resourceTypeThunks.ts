import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResourceTypesThunk = createAsyncThunk(
  'resourceType/fetchResourceTypesThunk',
  async (params: void) => {
    try {
      const response = await fetchDatas<ResourceTypes>('/api/resourceType');

      console.log(response);
      return null;
    } catch (error) {
      return Promise.reject(error);
    }
    return null;
  }
);
