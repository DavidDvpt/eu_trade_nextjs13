import React, { ChangeEvent } from 'react';
import './formFields.scss';
interface IGenericSelectProps {
  value: string;
  items: SelectTypes;
  name: string;
  noValue?: string;
  error?: string;
  className?: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}

function GenericSelect({
  value,
  items,
  name,
  noValue,
  error,
  onChange,
}: IGenericSelectProps): React.ReactElement {
  return (
    <fieldset className={error ? 'error' : ''}>
      <label htmlFor='resourceType'></label>
      <div>
        <select value={value} onChange={onChange} name={name}>
          {noValue && <option value=''>{noValue}</option>}
          {items.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <p>{error}</p>
      </div>
    </fieldset>
  );
}

export default GenericSelect;
