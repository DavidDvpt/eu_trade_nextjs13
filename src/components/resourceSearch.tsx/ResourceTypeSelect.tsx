'use client';

import { fetchDatas } from '@/lib/axios/AxiosInstance';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
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
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function ResourceTypeSelect({
  value,
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const [items, setItems] = useState<SelectTypes>([]);

  const getDatas = async () => {
    const result = await fetchDatas('/api/resourceType');
    setItems(selectItemParser(result.data));
  };

  useEffect(() => {
    getDatas();
  }, []);

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items,
    value: value,
    onChange,
    name: 'type',
    noValue: 'Choisissez un type',
  });
}

export default ResourceTypeSelect;
