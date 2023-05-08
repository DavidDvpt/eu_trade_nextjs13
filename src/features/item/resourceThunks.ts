import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { Resource } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResourcesByTypeIdThunk = createAsyncThunk(
  'resource/fetchResourcesThunk',
  async (params: { resourceId: string }) => {
    try {
      if (params.resourceId) {
        const response = await fetchDatas<Resource>(
          `/api/resourceType/${params.resourceId}/resources`
        );

        return response;
      } else {
        return Promise.reject(MissingParamsError());
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
