import { TransactionExtended } from '@/app/extendedAppTypes';
import {
  fetchDatas,
  fetchSingleData,
  postEntity,
  updateEntity,
} from '@/lib/axios/requests/genericRequests';
import { SellStatus, TransactionType } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReloadActionEnum } from '../global/globalEnums';
import { globalActions } from '../global/globalSlice';

export const fetchTransactionsThunk = createAsyncThunk(
  'transaction/fetchTransactionsThunk',
  async (params: IFetchTransactionsParams) => {
    try {
      const { sellStatus, transactionType, itemId } = params;
      let url = '/api/transaction';

      if (itemId) {
        //fetch only one resource
        url = `/api/items/${itemId}/transactions`;
      }

      const response = await fetchDatas<TransactionExtended>(url, {
        params: { sellStatus, transactionType },
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
        '/api/transactions/profit'
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
      toReload?: ReloadActionEnum[];
    },
    tools
  ) => {
    try {
      const { body, toReload } = params;
      const response = await postEntity<TransactionExtended>({
        url: '/api/transactions',
        body,
      });

      if (toReload) {
        tools.dispatch(globalActions.addReload(toReload));
      }
      // if (body.type === TransactionType.SELL) {
      //   tools.dispatch(stockActions.singleQtySubstract(body.quantity));
      // }
      // if (body.type === TransactionType.BUY) {
      // }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const updateTransactionThunk = createAsyncThunk(
  'transaction/updateTransactionThunk',
  async (
    params: {
      transaction: TransactionExtended;
      toReload: ReloadActionEnum[];
    },
    tools
  ) => {
    try {
      const { transaction, toReload } = params;
      if (transaction.id) {
        const response = await updateEntity({
          url: `/api/transactions/${transaction.id}`,
          body: transaction,
        });

        tools.dispatch(globalActions.addReload(toReload));
        tools.dispatch(fetchTransactionsGlobalProfitThunk());

        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
