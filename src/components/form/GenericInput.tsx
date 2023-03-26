import { ChangeEvent } from 'react';

interface IGenericInputProps {
  name: string;
  label?: string;
  value: string | number;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
}
function GenericInput({
  name,
  value,
  onChange,
  type = 'text',
  label,
}: IGenericInputProps) {
  return (
    <fieldset>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        disabled
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
}

export default GenericInput;
