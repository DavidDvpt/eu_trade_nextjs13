import React, { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';

interface IHookFormInputFieldProps {
  control: any;
  name: string;
  type?: string;
  label: string;
  className?: string;
  disabled?: boolean;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
}
function HookFormInputField({
  control,
  name,
  type = 'text',
  label,
  className,
  disabled,
  onInputChange,
}: IHookFormInputFieldProps): React.ReactElement {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: any,
    name: string
  ) => {
    onChange(e);
    onInputChange && onInputChange(e, name);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <fieldset className={`${className ?? ''}`}>
          <label htmlFor={name}>{label}</label>

          <input
            type={type}
            value={value}
            onChange={(e) => handleChange(e, onChange, name)}
            disabled={disabled}
          />
        </fieldset>
      )}
    />
  );
}

export default HookFormInputField;
