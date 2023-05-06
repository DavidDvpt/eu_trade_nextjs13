import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { Resource } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  getLoadManagerState,
  loadManagerActions,
} from '../loadManager/loadManagerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const useResource = () => {
  const [resources, setResources] = useState<Resources | null>(null);
  const { resourceParams } = useAppSelector(getLoadManagerState);
  const dispatch = useAppDispatch();

  const loadResources = async () => {
    try {
      const response = await fetchDatas<Resource>(
        `/api/resourceType/${resourceParams?.resourceTypeId}/resources`
      );

      dispatch(loadManagerActions.setResourceParams(null));
      setResources(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (resourceParams !== null) {
      loadResources();
    }
  }, [resourceParams]);

  return { resources };
};

export default useResource;
