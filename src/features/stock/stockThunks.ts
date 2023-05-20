import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItemQuantityThunk = createAsyncThunk(
  'stock/fetchItemQuantityThunk',
  async (params: { itemId: string }) => {
    try {
      if (params.itemId) {
        const response = await axios.get<{ stock: number }>(
          `/api/items/${params.itemId}/stock`
        );

        return response.data.stock ?? 0;
      } else {
        return Promise.reject(MissingParamsError());
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchUserStockListThunk = createAsyncThunk(
  'stock/fetchUserStockListThunk',
  async () => {
    try {
      const stocks = await fetchDatas<UserStock>(`/api/transactions/stock`);

      return stocks;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
