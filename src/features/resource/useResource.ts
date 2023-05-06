import { useEffect, useState } from 'react';
import {
  getLoadManagerState,
  loadManagerActions,
} from '../loadManager/loadManagerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchResources } from './resourceRequests';

const useResource = () => {
  const [resources, setResources] = useState<Resources | null>(null);
  const { resourceParams } = useAppSelector(getLoadManagerState);
  const dispatch = useAppDispatch();

  const loadResources = async () => {
    try {
      const result = await fetchResources({
        resourceTypeId: resourceParams?.resourceTypeId,
      });

      dispatch(loadManagerActions.setResourceParams(null));
      setResources(result);
    } catch (error) {
      setResources([]);
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
