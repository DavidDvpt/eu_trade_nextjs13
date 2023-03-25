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
};

interface IResourceTypeSelectProps extends IChildren {
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  value: ResourceSelectValue;
}

function ResourceSelect({
  value,
  onChange,
  children,
}: IResourceTypeSelectProps): React.ReactElement {
  const [items, setItems] = useState<SelectTypes>([]);
  console.log(value);
  const getDatas = async () => {
    const result = await fetchDatas(
      `/api/resourceType/${value.type}/resources`
    );
    setItems(selectItemParser(result.data));
  };

  useEffect(() => {
    if (value.type) {
      getDatas();
    } else {
      setItems([]);
    }
  }, [value.type]);

  return cloneElement(children as ReactElement<ChildrenProps>, {
    items,
    value: value.resource,
    onChange,
    name: 'resource',
  });
}

export default ResourceSelect;
