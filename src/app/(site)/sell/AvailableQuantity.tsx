'use client';
import { getStockState } from '@/features/stock/stockSlice';
import { fetchSingleResourceQuantity } from '@/features/stock/stockThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { useEffect } from 'react';

interface IAvailableQuantityProps {
  resourceId: string | null;
}

function AvailableQuantity({
  resourceId,
}: IAvailableQuantityProps): JSX.Element {
  const { singleResourceQty } = useAppSelector(getStockState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resourceId) {
      dispatch(fetchSingleResourceQuantity({ resourceId }));
    }
  }, [resourceId]);

  if (singleResourceQty.status === ApiStatusEnum.PENDING) {
    return <div>Stock : chargement ...</div>;
  }

  return <div>Stock : {singleResourceQty.result}</div>;
}

export default AvailableQuantity;
