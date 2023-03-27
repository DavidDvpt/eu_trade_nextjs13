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
    const calculatedTT = +watch('calculatedTT');
    const buyValue = watch('buyValue');

    if (resource) {
      if (name === 'quantity') {
        setValue('calculatedTT', +Number(+value * resource.value).toFixed(2));
        setValue(
          'costPercentage',
          +Number((+buyValue - +calculatedTT) * 100).toFixed(2)
        );
      }

      if (name === 'buyValue' && calculatedTT > 0) {
        setValue(
          'calculatedExtraCost',
          +Number(+value - calculatedTT).toFixed(2)
        );
        setValue(
          'costPercentage',
          +Number((+value / calculatedTT) * 100).toFixed(2)
        );
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
        className={styles.resourceName}
        disabled
      />
      <HookFormInputField
        control={control}
        name='quantity'
        type='number'
        label='quantité'
        className={styles.quantity}
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='calculatedTT'
        type='number'
        label='Cout TT'
        disabled
        className={styles.calcuatedTT}
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='buyValue'
        type='number'
        label='Prix achat'
        className={styles.buyValue}
        onInputChange={handleInputChange}
      />
      <HookFormInputField
        control={control}
        name='calculatedExtraCost'
        type='number'
        label='Extra TT'
        disabled
        className={styles.calculatedExtraCost}
      />{' '}
      <HookFormInputField
        control={control}
        name='costPercentage'
        type='number'
        label='%'
        disabled
        className={styles.costPercentage}
      />
    </form>
  );
}

export default BuyForm;
