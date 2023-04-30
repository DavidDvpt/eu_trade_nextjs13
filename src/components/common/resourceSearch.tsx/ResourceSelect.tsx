'use client';

import { getResourcesState } from '@/features/resource/resourceSlice';
import { fetchResourcesByTypeIdThunk } from '@/features/resource/resourceThunks';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';

import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { Resource } from '@prisma/client';
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
  onChange: (value: Resource) => void;
  value: ResourceSelectValue;
}

function ResourceSelect({
  value,
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const { resources } = useAppSelector(getResourcesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResourcesByTypeIdThunk({ resourceId: value.type }));
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (resources.result) {
      const item = resources.result.find((f) => f.id === id) as Resource;
      onChange(item);
    }
  };

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: selectItemParser(resources.result ?? []),
    value: value.resource,
    onChange: handleChange,
    name: 'resource',

    noValue: 'Choisissez une Ressource',
  });
}

export default ResourceSelect;
