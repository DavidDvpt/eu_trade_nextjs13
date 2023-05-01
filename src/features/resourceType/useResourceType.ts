import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { ResourceType } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  getLoadManagerState,
  loadManagerActions,
} from '../loadManager/loadManagerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const useResourceType = () => {
  const { resourceType } = useAppSelector(getLoadManagerState);
  const [resourceTypes, setResourceTypes] = useState<ResourceTypes | null>(
    null
  );
  const dispatch = useAppDispatch();
  const loadResources = async () => {
    try {
      const response = await fetchDatas<ResourceType>('/api/resourceType');
      dispatch(loadManagerActions.setResourceType(false));

      setResourceTypes(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (resourceType) {
      loadResources();
    }
  }, [resourceType]);

  useEffect(() => {
    return () => {
      dispatch(loadManagerActions.setResourceType(true));
    };
  }, []);

  return { resourceTypes };
};

export default useResourceType;
