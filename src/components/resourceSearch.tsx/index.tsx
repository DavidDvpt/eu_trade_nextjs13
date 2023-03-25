'use client';

import { ChangeEvent, useState } from 'react';
import GenericSelect from '../form/GenericSelect';
import styles from './resourceSearch.module.scss';
import ResourceSelect from './ResourceSelect';
import ResourceTypeSelect from './ResourceTypeSelect';

interface IResourceSearchProps {
  onChange: (value: string) => void;
}
const inisitalValues = {
  type: '',
  resource: '',
};

function ResourceSearch({ onChange }: IResourceSearchProps) {
  const [values, setValues] = useState<ResourceSelectValue>(inisitalValues);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof ResourceSelectValue;
    const value = e.target.value;
    setValues({ ...values, [name]: value });

    if (value === 'resource') {
      onChange(value);
    }
  };

  return (
    <section className={styles.resourceSearch}>
      <ResourceTypeSelect onChange={handleTypeChange} value={values.type}>
        <GenericSelect
          items={undefined as never}
          name={undefined as never}
          onChange={undefined as never}
          value={undefined as never}
        />
      </ResourceTypeSelect>
      <ResourceSelect onChange={handleTypeChange} value={values}>
        <GenericSelect
          items={undefined as never}
          name={undefined as never}
          onChange={undefined as never}
          value={undefined as never}
        />
      </ResourceSelect>
    </section>
  );
}

export default ResourceSearch;
