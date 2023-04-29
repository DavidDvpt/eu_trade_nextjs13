import { TransactionExtended } from '@/app/extendedAppTypes';
import { fetchDatas, postEntity } from '@/lib/axios/requests/genericRequests';
import { TransactionType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { stockActions } from '../stock/stockSlice';

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
      const response = await postEntity<TransactionExtended>({
        url: '/api/transaction',
        body: params,
      });

      tools.dispatch(fetchTransactionsThunk({ type: TransactionType.BUY }));
      if (params.transactionType === TransactionType.SELL) {
        tools.dispatch(stockActions.singleQtySubstract(params.quantity));
      }
      if (params.transactionType === TransactionType.BUY) {
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
