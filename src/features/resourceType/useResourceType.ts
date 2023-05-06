import { useEffect, useState } from 'react';
import {
  getLoadManagerState,
  loadManagerActions,
} from '../loadManager/loadManagerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchResourceTypes } from './resourceTypeRequest';

const useResourceType = () => {
  const { resourceTypeLoad } = useAppSelector(getLoadManagerState);
  const [resourceTypes, setResourceTypes] = useState<ResourceTypes | null>(
    null
  );
  const dispatch = useAppDispatch();
  const loadResources = async () => {
    fetchResourceTypes().then(
      (response) => {
        dispatch(loadManagerActions.setResourceTypeLoad(false));
        setResourceTypes(response);
      },
      () => {
        setResourceTypes([]);
      }
    );
  };

  useEffect(() => {
    if (resourceTypeLoad) {
      loadResources();
    }
  }, [resourceTypeLoad]);

  useEffect(() => {
    return () => {
      dispatch(loadManagerActions.setResourceTypeLoad(true));
    };
  }, []);

  return { resourceTypes };
};

export default useResourceType;
