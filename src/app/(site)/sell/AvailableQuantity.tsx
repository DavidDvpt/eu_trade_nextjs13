'use client';
import { getStockState } from '@/features/stock/stockSlice';
import { fetchSingleItemQuantityThunk } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { useEffect } from 'react';

interface IAvailableQuantityProps {
  itemId: string | null;
}

function AvailableQuantity({ itemId }: IAvailableQuantityProps): JSX.Element {
  const { singleItemQty } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleItemQuantityThunk({ itemId }));
    }
  }, [itemId]);

  if (singleItemQty.status === ApiStatusEnum.PENDING) {
    return <div>Stock : chargement ...</div>;
  }

  return <div>Stock : {singleItemQty.result}</div>;
}

export default AvailableQuantity;
