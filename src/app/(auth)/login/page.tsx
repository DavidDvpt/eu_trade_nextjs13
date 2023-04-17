'use client';

import Button from '@/components/form/Button';
import HookFormInputField from '@/components/form/HookFormInputField';
import HookFormPasswordInput from '@/components/form/HookFormPasswordInput';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styles from '../auth.module.scss';

type LoginFormValues = { email: string; password: string };
const intialLoginValues: LoginFormValues = {
  email: '',
  password: '',
};

function Login(): React.ReactElement {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: intialLoginValues });

  const onSubmit = async (values: LoginFormValues) => {
    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    })
      .then((response: any) => {
        if (response.status === 200) {
          router.push('/');
        }
        if (response.status === 401) {
          switch (response.error) {
            case 'bad email':
              setError('email', { message: 'Mail inconnu' });
              break;
            case 'bad password':
              setError('password', { message: 'Mauvais mot de passe' });
              break;
            default:
              break;
          }
        }
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormInputField
        control={control}
        name='email'
        label='Email '
        className={styles.fieldset}
        error={errors['email']}
      />

      <HookFormPasswordInput
        control={control}
        name='password'
        label='Mot de passe '
        className={styles.fieldset}
        error={errors['password']}
      />
      <div className={styles.buttonContainer}>
        <Button type='submit' primary>
          Se connecter
        </Button>
      </div>
    </form>
  );
}

export default Login;
