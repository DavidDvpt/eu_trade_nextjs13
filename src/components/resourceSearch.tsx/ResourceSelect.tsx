'use client';

import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { Resource } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, cloneElement, ReactElement } from 'react';

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
  const { data } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await fetch(`/api/resourceType/${value.type}/resources`);
      const result = await response.json();
      return result.data as Resource[];
    },
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (data) {
      const item = data.find((f) => f.id === id) as Resource;
      onChange(item);
    }
  };

  return (
    <>
      {data &&
        cloneElement(children as ReactElement<ChildrenProps>, {
          items: selectItemParser(data),
          value: value.resource,
          onChange: handleChange,
          name: 'resource',

          noValue: 'Choisissez une Ressource',
        })}
    </>
  );
}

export default ResourceSelect;
