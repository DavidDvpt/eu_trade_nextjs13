'use client';

import { getResourceTypesState } from '@/features/resourceType/resourceTypeSlice';
import { fetchResourceTypesThunk } from '@/features/resourceType/resourceTypeThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';

import { selectItemParser } from '@/lib/parser/selectItemsParser';
import React, {
  ChangeEvent,
  ReactElement,
  cloneElement,
  useEffect,
} from 'react';

type ChildrenProps = {
  items: SelectTypes;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  noValue: string;
};

interface IResourceTypeSelectProps extends IChildren {
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function ResourceTypeSelect({
  value,
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const { resourceTypes } = useAppSelector(getResourceTypesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResourceTypesThunk());
  }, []);

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: selectItemParser(resourceTypes.result ?? []),
    value: value,
    onChange,
    name: 'type',
    noValue: 'Choisissez un type',
  });
}

export default ResourceTypeSelect;
