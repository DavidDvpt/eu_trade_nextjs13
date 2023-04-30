import React, { ChangeEvent } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import GenericInput from './GenericInput';

interface IHookFormInputFieldProps {
  control: any;
  name: string;
  type?: 'text' | 'number';
  label: string;
  className?: string;
  disabled?: boolean;
  trigger?: any;
  error?: FieldError;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
}
function HookFormInputField({
  control,
  name,
  type = 'text',
  label,
  className,
  disabled,
  trigger,
  error,
  onInputChange,
}: IHookFormInputFieldProps): React.ReactElement {
  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    onChange: any,
    name: string
  ) => {
    onChange(e);
    onInputChange && onInputChange(e, name);

    if (trigger) await trigger([name]);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <GenericInput
          className={className}
          value={value ?? ''}
          onChange={(e) => handleChange(e, onChange, name)}
          type={type}
          label={label}
          disabled={disabled}
          error={error?.message}
        />
      )}
    />
  );
}

export default HookFormInputField;
