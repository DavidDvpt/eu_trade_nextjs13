import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface IPasswordInputProps {
  control: any;
  name: string;
  type?: string;
  label: string;
}
function InputField({
  control,
  name,
  type = 'text',
  label,
}: IPasswordInputProps): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField {...field} type={type} variant='outlined' />
      )}
    />
  );
}

export default InputField;
