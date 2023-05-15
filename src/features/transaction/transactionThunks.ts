import { TransactionExtended } from '@/app/extendedAppTypes';
import {
  fetchDatas,
  fetchSingleData,
  postEntity,
  updateEntity,
} from '@/lib/axios/requests/genericRequests';
import { SellStatus, TransactionType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { stockActions } from '../stock/stockSlice';

export const fetchTransactionsThunk = createAsyncThunk(
  'transaction/fetchTransactionsThunk',
  async (params: IFetchTransactionsParams) => {
    try {
      const { sellStatus, type, itemId } = params;
      let url = '/api/transaction';

      if (itemId) {
        //fetch only one resource
        url = `/api/resource/${itemId}/transactions`;
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
export const fetchTransactionsGlobalProfitThunk = createAsyncThunk(
  'transaction/fetchTransactionsGlobalProfit',
  async () => {
    try {
      const response = await fetchSingleData<TransactionBenefitResult>(
        '/api/transaction/profit'
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const postTransactionThunk = createAsyncThunk(
  'transaction/postTransactionThunk',
  async (
    params: {
      body: TransactionFormType & {
        type: TransactionType;
        sellStatus: SellStatus | null;
      };
      callback?: () => void;
    },
    tools
  ) => {
    try {
      const { body, callback } = params;
      const response = await postEntity<TransactionExtended>({
        url: '/api/transaction',
        body,
      });

      callback && callback();
      tools.dispatch(
        fetchTransactionsThunk({
          type: body.type,
          itemId: body.itemId,
        })
      );
      if (body.type === TransactionType.SELL) {
        tools.dispatch(stockActions.singleQtySubstract(body.quantity));
      }
      if (body.type === TransactionType.BUY) {
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const updateTransactionThunk = createAsyncThunk(
  'transaction/updateTransactionThunk',
  async (
    params: { transaction: TransactionExtended; sellStatus?: SellStatus },
    tools
  ) => {
    try {
      const { transaction, sellStatus } = params;
      if (transaction.id) {
        const response = await updateEntity({
          url: `/api/transaction/${transaction.id}`,
          body: transaction,
        });

        tools.dispatch(
          fetchTransactionsThunk({ type: transaction.type, sellStatus })
        );
        tools.dispatch(fetchTransactionsGlobalProfitThunk());

        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
