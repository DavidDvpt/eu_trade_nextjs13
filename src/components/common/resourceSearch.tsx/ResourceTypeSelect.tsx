'use client';

import { fetchResourceTypesThunk } from '@/features/resourceType/resourceTypeThunks';
import { useAppDispatch } from '@/features/store/hooks';
import { fetchDatas } from '@/lib/axios/requests/genericRequests';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { ResourceType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, {
  ChangeEvent,
  cloneElement,
  ReactElement,
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
  const dispatch = useAppDispatch();
  const { data } = useQuery({
    queryKey: ['resourceTypes'],
    queryFn: async () => {
      const response = await fetchDatas<ResourceType>('/api/resourceType');

      return response;
    },
  });

  useEffect(() => {
    dispatch(fetchResourceTypesThunk());
  }, []);

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: data ? selectItemParser(data) : [],
    value: value,
    onChange,
    name: 'type',
    noValue: 'Choisissez un type',
  });
}

export default ResourceTypeSelect;
