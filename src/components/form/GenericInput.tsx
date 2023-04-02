import { ChangeEvent } from 'react';

interface IGenericInputProps {
  name?: string;
  label?: string;
  value: string | number;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  disabled?: boolean;
  className?: string;
}
function GenericInput({
  name,
  value,
  onChange,
  type = 'text',
  label,
  disabled,
  className,
}: IGenericInputProps) {
  return (
    <fieldset>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={className}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={(e) => e.target.select()}
      />
    </fieldset>
  );
}

export default GenericInput;
