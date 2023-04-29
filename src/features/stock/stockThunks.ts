import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleResourceQuantity = createAsyncThunk(
  'stock/fetchSingleResourceQuantity',
  async (params: { resourceId: string }) => {
    try {
      if (params.resourceId) {
        const response = await axios.get<{ data: number }>(
          `/api/resource/${params.resourceId}/stock`
        );

        return response.data.data ?? 0;
      } else {
        return Promise.reject(MissingParamsError());
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
