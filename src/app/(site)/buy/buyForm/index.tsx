import HookFormInputField from '@/components/form/HookFormInputField';
import { Resource } from '@prisma/client';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './buyForm.module.scss';
import { initialValues } from './constants';
interface IBuyFormProps {
  resource: Resource | null;
}

function BuyForm({ resource }: IBuyFormProps) {
  const {
    formState: { isDirty },
    watch,
    setValue,
    handleSubmit,
    control,
  } = useForm<BuyFormType>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (resource) {
      setValue('resourceId', resource.id);
      setValue('resourceName', resource?.name);
    }
  }, [resource]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target;
    const calculatedTT = watch('calculatedTT');
    const buyValue = watch('buyValue');

    if (resource) {
      if (name === 'quantity') {
        setValue('calculatedTT', +value * resource.value);
        setValue('costPercentage', (+buyValue - +calculatedTT) * 100);
      }

      if (name === 'buyValue') {
        setValue('calculatedExtraCost', +value * +calculatedTT);
        setValue('costPercentage', (+value - +calculatedTT) * 100);
      }
    }
  };

  const onSubmit = (values: BuyFormType) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
      <HookFormInputField
        control={control}
        name='resourceName'
        label='Ressource'
        disabled
      />
      <HookFormInputField
        control={control}
        name='quantity'
        type='number'
        label='quantité'
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='calculatedTT'
        type='number'
        label='Cout TT'
        disabled
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='buyValue'
        type='number'
        label='Prix achat'
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='calculatedExtraCost'
        type='number'
        label='Extra TT'
      />{' '}
      <HookFormInputField
        control={control}
        name='costPercentage'
        type='number'
        label='%'
        disabled
      />
    </form>
  );
}

export default BuyForm;
