'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

type LoginFormValues = { email: string; password: string };
const intialLoginValues: LoginFormValues = { email: '', password: '' };

function Login(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: intialLoginValues });

  const onSubmit = async (values: LoginFormValues) => {
    console.log(values);
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
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input type='text' {...register('email')} aria-required='true' />
      </fieldset>

      <fieldset>
        <label htmlFor='password'>Mot de passe</label>
        <input type='password' {...register('password')} aria-required='true' />
      </fieldset>

      <button type='submit'>Se connecter</button>
    </form>
  );
}

export default Login;
