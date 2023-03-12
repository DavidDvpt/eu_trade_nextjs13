'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormValues = { email: string; password: string };
const intialLoginValues: LoginFormValues = { email: '', password: '' };

function Login(): React.ReactElement {
  const router = useRouter();
  const [error, setError] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: intialLoginValues });

  const onSubmit = async (values: LoginFormValues) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }

    if (res?.url) {
      router.push(res.url);
    }
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
