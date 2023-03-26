import React from 'react';
import { Controller } from 'react-hook-form';

interface IHookFormInputFieldProps {
  control: any;
  name: string;
  type?: string;
  label: string;
  className?: string;
  disabled?: boolean;
}
function HookFormInputField({
  control,
  name,
  type = 'text',
  label,
  className,
  disabled,
}: IHookFormInputFieldProps): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className={`${className ?? ''}`}>
          <label htmlFor={name}>{label}</label>

          <input type={type} {...field} disabled={disabled} />
        </fieldset>
      )}
    />
  );
}

export default HookFormInputField;
