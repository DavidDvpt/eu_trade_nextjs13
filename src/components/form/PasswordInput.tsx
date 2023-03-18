import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import styles from './formFields.module.scss';
interface IPasswordInputProps {
  control: any;
  name: string;
  className?: string;
  label: string;
}
function PasswordInput({
  control,
  name,
  className,
  label,
}: IPasswordInputProps): React.ReactElement {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className={`${styles.fieldset} ${className ?? ''}`}>
          <label htmlFor={name}>{label}</label>
          <div>
            <input type={hidden ? 'password' : 'text'} {...field} />
          </div>
        </fieldset>
      )}
    />
  );
}

export default PasswordInput;
