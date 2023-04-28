import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { ResourceType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResourceTypesThunk = createAsyncThunk(
  'resourceType/fetchResourceTypesThunk',
  async () => {
    try {
      const response = await fetchDatas<ResourceType>('/api/resourceType');

      console.log(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
