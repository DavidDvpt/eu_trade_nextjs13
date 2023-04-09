import { ChangeEvent } from 'react';
import './formFields.scss';
interface IGenericInputProps {
  name?: string;
  label?: string;
  value: string | number;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'password';
  disabled?: boolean;
  className?: string;
  error?: string;
}
function GenericInput({
  name,
  value,
  onChange,
  type = 'text',
  label,
  disabled,
  error,
}: IGenericInputProps) {
  return (
    <fieldset className={error ? 'error' : ''}>
      {label && <label htmlFor={name}>{`${label} :`}</label>}
      <div>
        <input
          type={type}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={(e) => e.target.select()}
        />
        {<p>{error}</p>}
      </div>
    </fieldset>
  );
}

export default GenericInput;
