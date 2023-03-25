'use client';

import { fetchDatas } from '@/lib/axios/AxiosInstance';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
import React, { ChangeEvent, useEffect, useState } from 'react';
import GenericSelect from '../form/GenericSelect';

interface IResourceTypeSelectProps {
  onChange: (value: string) => void;
}
type Values = { type: string; resource: string };
function ResourceTypeSelect({
  onChange,
}: IResourceTypeSelectProps): React.ReactElement {
  const [values, setValues] = useState<Values>({ type: '', resource: '' });
  const [types, setTypes] = useState<SelectTypes>([]);

  const getDatas = async () => {
    const result = await fetchDatas('/api/resourceType');

    setTypes(selectItemParser(result.data));
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof Values;
    const value: string = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <GenericSelect
      items={types}
      onChange={handleChange}
      value={values.type}
      name='type'
    />
  );
}

export default ResourceTypeSelect;
