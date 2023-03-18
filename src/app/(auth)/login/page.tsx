'use client';

import InputField from '@/components/form/InputField';
import PasswordInput from '@/components/form/PasswordInput';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

type LoginFormValues = { email: string; password: string };
const intialLoginValues: LoginFormValues = { email: '', password: '' };

function Login(): React.ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: intialLoginValues });

  const onSubmit = async (values: LoginFormValues) => {
    console.log('before submit', values);
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField control={control} name='email' label='Email' />

      <PasswordInput control={control} name='password' />

      <Button type='submit' variant='contained' color='info'>
        Se connecter
      </Button>
      {/* <button type='submit'>Se connecter</button> */}
    </form>
  );
}

export default Login;
