'use client';

import useResource from '@/features/resource/useResource';

import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { Resource } from '@prisma/client';
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

interface IResourceTypeSelectProps extends IChildren {
  onChange: (value: Resource) => void;
}

function ResourceSelect({
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const { resources } = useResource();
  const [selected, setSelected] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (resources) {
      setSelected(id);
      const item = resources.find((f) => f.id === id) as Resource;
      onChange(item);
    }
  };

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: selectItemParser(resources ?? []),
    value: selected,
    onChange: handleChange,
    name: 'resource',

    noValue: 'Choisissez une Ressource',
  });
}

export default ResourceSelect;
