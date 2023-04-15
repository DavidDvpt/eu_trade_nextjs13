import React, { ChangeEvent, useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import GenericInput from './GenericInput';
interface IHookFormPasswordInputProps {
  control: any;
  name: string;
  className?: string;
  label: string;
  disabled?: boolean;
  error?: FieldError;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
}
function HookFormPasswordInput({
  control,
  name,
  className,
  label,
  disabled,
  error,
  onInputChange,
}: IHookFormPasswordInputProps): React.ReactElement {
  const [hidden, setHidden] = useState<boolean>(true);
  const handleChange = async (
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
        <GenericInput
          value={value}
          onChange={(e) => handleChange(e, onChange, name)}
          className={className}
          type={hidden ? 'password' : 'text'}
          label={label}
          disabled={disabled}
          error={error?.message}
        />
      )}
    />
  );
}
{
  /* <fieldset className={`${className ?? ''}`}>
<label htmlFor={name}>{label}</label>
<input type={hidden ? 'password' : 'text'} {...field} />
</fieldset> */
}
export default HookFormPasswordInput;
