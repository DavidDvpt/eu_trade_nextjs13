import React from 'react';
import { Controller } from 'react-hook-form';

interface IInputFieldProps {
  control: any;
  name: string;
  type?: string;
  label: string;
  className?: string;
}
function InputField({
  control,
  name,
  type = 'text',
  label,
  className,
}: IInputFieldProps): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className={`${className ?? ''}`}>
          <label htmlFor={name}>{label}</label>

          <input type={type} {...field} />
        </fieldset>
      )}
    />
  );
}

export default InputField;
