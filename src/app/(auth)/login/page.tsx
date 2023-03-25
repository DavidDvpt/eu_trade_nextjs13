'use client';

import Button from '@/components/form/Button';
import HookFormInputField from '@/components/form/HookFormInputField';
import HookFormPasswordInput from '@/components/form/HookFormPasswordInput';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import styles from '../auth.module.scss';

type LoginFormValues = { email: string; password: string };
const intialLoginValues: LoginFormValues = {
  email: 'appmail@gmail.com',
  password: 'david',
};

function Login(): React.ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: intialLoginValues });

  const onSubmit = async (values: LoginFormValues) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <HookFormInputField
          control={control}
          name='email'
          label='Email :'
          className={styles.fieldset}
        />

        <HookFormPasswordInput
          control={control}
          name='password'
          label='Mot de passe :'
          className={styles.fieldset}
        />

        <Button content='Se connecter' type='submit' primary />
      </section>
    </form>
  );
}

export default Login;
