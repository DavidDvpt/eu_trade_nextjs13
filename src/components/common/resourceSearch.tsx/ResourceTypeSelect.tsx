'use client';

import { loadManagerActions } from '@/features/loadManager/loadManagerSlice';
import useResourceType from '@/features/resourceType/useResourceType';
import { useAppDispatch } from '@/features/store/hooks';

import { selectItemParser } from '@/lib/parser/selectItemsParser';
import React, {
  ChangeEvent,
  ReactElement,
  cloneElement,
  useState,
} from 'react';

type ChildrenProps = {
  items: SelectTypes;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  noValue: string;
};

type IResourceTypeSelectProps = IChildren;

function ResourceTypeSelect({
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const [selected, setSelected] = useState<string>('');
  const { resourceTypes } = useResourceType();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    dispatch(loadManagerActions.setResource({ resourceTypeId: value }));
  };

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: selectItemParser(resourceTypes ?? []),
    value: selected,
    onChange: handleChange,
    name: 'type',
    noValue: 'Choisissez un type',
  });
}

export default ResourceTypeSelect;
