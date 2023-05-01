'use client';

import { Resource } from '@prisma/client';
import GenericSelect from '../../form/GenericSelect';
import ResourceSelect from './ResourceSelect';
import ResourceTypeSelect from './ResourceTypeSelect';
import styles from './resourceSearch.module.scss';

interface IResourceSearchProps {
  onChange: (value: Resource) => void;
}

function ResourceSearch({ onChange }: IResourceSearchProps) {
  return (
    <section className={styles.resourceSearch}>
      <ResourceTypeSelect>
        <GenericSelect
          items={undefined as never}
          name={undefined as never}
          onChange={undefined as never}
          value={undefined as never}
          noValue={undefined as never}
        />
      </ResourceTypeSelect>

      <ResourceSelect onChange={onChange}>
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
