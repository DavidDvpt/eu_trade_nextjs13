import { TransactionExtended } from '@/app/extendedAppTypes';
import { fetchDatas, postEntity } from '@/lib/axios/requests/genericRequests';
import { Transaction, TransactionType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactionsThunk = createAsyncThunk(
  'transaction/fetchTransactionsThunk',
  async (params: IFetchTransactionsParams) => {
    try {
      const { sellStatus, type, resourceId } = params;
      let url = '/api/transaction';

      if (resourceId) {
        //fetch only one resource
        url = `/api/resource/${resourceId}/transactions`;
      }

      const response = await fetchDatas<TransactionExtended>(url, {
        params: { sellStatus, type },
      });

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postTransactionThunk = createAsyncThunk(
  'transaction/postTransactionThunk',
  async (params: TransactionFormType, tools) => {
    try {
      const response = await postEntity<Transaction>({
        url: '/api/transaction',
        body: params,
      });

      if (params.transactionType === TransactionType.SELL) {
      }
      if (params.transactionType === TransactionType.BUY) {
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
