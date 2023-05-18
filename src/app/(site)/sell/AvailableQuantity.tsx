'use client';
import { getStockState, stockActions } from '@/features/stock/stockSlice';
import { fetchItemQuantityThunk } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { useEffect } from 'react';

interface IAvailableQuantityProps {
  itemId: string | null;
}

function AvailableQuantity({ itemId }: IAvailableQuantityProps): JSX.Element {
  const { itemQty } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(stockActions.singleQtyReset());
    };
  }, []);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemQuantityThunk({ itemId }));
    }
  }, [itemId]);

  if (itemQty.status === ApiStatusEnum.PENDING) {
    return <div>Stock : chargement ...</div>;
  }

  return <div>Stock : {itemQty.result}</div>;
}

export default AvailableQuantity;
