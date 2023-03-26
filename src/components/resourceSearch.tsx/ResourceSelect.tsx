'use client';

import { fetchDatas } from '@/lib/axios/AxiosInstance';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { Resource } from '@prisma/client';
import React, {
  ChangeEvent,
  cloneElement,
  ReactElement,
  useEffect,
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
  value: ResourceSelectValue;
}

function ResourceSelect({
  value,
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const [items, setItems] = useState<Resource[]>([]);

  const getDatas = async () => {
    const result = await fetchDatas(
      `/api/resourceType/${value.type}/resources`
    );
    setItems(result.data);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const item = items.find((f) => f.id === id) as Resource;

    onChange(item);
  };
  useEffect(() => {
    if (value.type) {
      getDatas();
    } else {
      setItems([]);
    }
  }, [value.type]);

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items: selectItemParser(items),
    value: value.resource,
    onChange: handleChange,
    name: 'resource',

    noValue: 'Choisissez une Ressource',
  });
}

export default ResourceSelect;
