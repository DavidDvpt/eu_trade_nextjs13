import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleItemQuantityThunk = createAsyncThunk(
  'stock/fetchSingleItemQuantityThunk',
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
export const fetchSimpleStockListThunk = createAsyncThunk(
  'stock/fetchSimpleStockListThunk',
  async () => {
    try {
      const stocks = await fetchDatas<SimpleStock>(`/api/transaction/stock`);

      return stocks;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
