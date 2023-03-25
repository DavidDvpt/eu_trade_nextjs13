'use client';

import React, { ChangeEvent } from 'react';
interface IGenericSelectProps {
  value: string;
  items: SelectTypes;
  name: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}

function GenericSelect({
  value,
  items,
  name,
  onChange,
}: IGenericSelectProps): React.ReactElement {
  return (
    <fieldset>
      <label htmlFor='resourceType'></label>
      <select value={value} onChange={onChange} name={name}>
        <option value=''>Choisissez un type</option>
        {items.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default GenericSelect;
