import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
interface IHookFormPasswordInputProps {
  control: any;
  name: string;
  className?: string;
  label: string;
}
function HookFormPasswordInput({
  control,
  name,
  className,
  label,
}: IHookFormPasswordInputProps): React.ReactElement {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className={`${className ?? ''}`}>
          <label htmlFor={name}>{label}</label>
          <input type={hidden ? 'password' : 'text'} {...field} />
        </fieldset>
      )}
    />
  );
}

export default HookFormPasswordInput;
