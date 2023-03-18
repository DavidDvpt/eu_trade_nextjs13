import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

interface IPasswordInputProps {
  control: any;
  name: string;
}
function PasswordInput({
  control,
  name,
}: IPasswordInputProps): React.ReactElement {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label='Mot de passe'
          labelPlacement='start'
          control={
            <TextField
              {...field}
              type={hidden ? 'password' : 'text'}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => setHidden(!hidden)}>
                      {hidden ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          }
        />
      )}
    />
  );
}

export default PasswordInput;
