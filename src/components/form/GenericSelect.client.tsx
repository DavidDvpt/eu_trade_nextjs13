'use client';

import React, { ChangeEvent, useState } from 'react';
interface IGenericSelectProps {
  items: SelectTypes;
  onChange: (value: string) => void;
}
function GenericSelect({
  items,
  onChange,
}: IGenericSelectProps): React.ReactElement {
  const [selected, setSelected] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <fieldset>
      <label htmlFor='resourceType'></label>
      <select name='resourceType' value={selected} onChange={handleChange}>
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
