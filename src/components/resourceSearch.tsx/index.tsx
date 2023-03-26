'use client';

import { Resource } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import GenericSelect from '../form/GenericSelect';
import styles from './resourceSearch.module.scss';
import ResourceSelect from './ResourceSelect';
import ResourceTypeSelect from './ResourceTypeSelect';

interface IResourceSearchProps {
  onChange: (value: Resource) => void;
}
const inisitalValues = {
  type: '',
  resource: '',
};

function ResourceSearch({ onChange }: IResourceSearchProps) {
  const [values, setValues] = useState<ResourceSelectValue>(inisitalValues);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValues({ ...values, type: value });
  };

  const handleResourceChange = (value: Resource) => {
    setValues({ ...values, resource: value.id });
    onChange(value);
  };

  return (
    <section className={styles.resourceSearch}>
      <ResourceTypeSelect onChange={handleTypeChange} value={values.type}>
        <GenericSelect
          items={undefined as never}
          name={undefined as never}
          onChange={undefined as never}
          value={undefined as never}
          noValue={undefined as never}
        />
      </ResourceTypeSelect>
      <ResourceSelect onChange={handleResourceChange} value={values}>
        <GenericSelect
          items={undefined as never}
          name={undefined as never}
          onChange={undefined as never}
          value={undefined as never}
          noValue={undefined as never}
        />
      </ResourceSelect>
    </section>
  );
}

export default ResourceSearch;
