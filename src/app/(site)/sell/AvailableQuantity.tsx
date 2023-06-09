'use client';
import { ReloadActionEnum } from '@/features/global/globalEnums';
import { getGlobalState } from '@/features/global/globalSlice';
import { getStockState, stockActions } from '@/features/stock/stockSlice';
import { fetchItemQuantityThunk } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { useEffect } from 'react';

interface IAvailableQuantityProps {
  itemId: string;
  load?: boolean;
}

function AvailableQuantity({ itemId }: IAvailableQuantityProps): JSX.Element {
  const NAME = ReloadActionEnum.RELOAD_UNIQUE_ITEM_QUANTITY;
  const { reload } = useAppSelector(getGlobalState);
  const { itemQty } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reload.includes(NAME)) {
      dispatch(fetchItemQuantityThunk({ itemId }));
    }
  }, [reload]);

  useEffect(() => {
    return () => {
      dispatch(stockActions.singleQtyReset());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchItemQuantityThunk({ itemId }));
  }, [itemId]);

  if (itemQty.status === ApiStatusEnum.PENDING) {
    return <div>Stock : chargement ...</div>;
  }

  return <div>Stock : {itemQty.result}</div>;
}

export default AvailableQuantity;
