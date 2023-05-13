import { MissingParamsError } from '@/lib/axios/axiosUtils';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { Item, ItemCategory, ItemType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItemCategoriesThunk = createAsyncThunk(
  'itemSearchEngine/fetchItemCategoriesThunk',
  async () => {
    try {
      const datas = await fetchDatas<ItemCategory>('/api/itemCategories');

      return datas;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchItemTypesThunk = createAsyncThunk(
  'itemSearchEngine/fetchItemTypesThunk',
  async (params: { itemCategoryId: string }) => {
    try {
      if (params.itemCategoryId) {
        const datas = await fetchDatas<ItemType>(
          `/api/itemCategories/${params.itemCategoryId}/itemTypes`
        );
        return datas;
      } else {
        return Promise.reject(MissingParamsError());
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchItemsThunk = createAsyncThunk(
  'itemSearchEngine/fetchItemsThunk',
  async (params: { itemTypeId: string }) => {
    try {
      const datas = await fetchDatas<Item>(
        `/api/itemTypes/${params.itemTypeId}/items`
      );

      return datas;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
