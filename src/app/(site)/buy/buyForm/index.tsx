import HookFormInputField from '@/components/form/HookFormInputField';
import { Resource } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './buyForm.module.scss';
import { initialCalculatedValues, initialValues } from './constants';
interface IBuyFormProps {
  resource: Resource | null;
}

function BuyForm({ resource }: IBuyFormProps) {
  const [calculatedValues, setCalculatedValues] =
    useState<BuyFormCalculatedValues>(initialCalculatedValues);
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
    }
  }, [resource]);

  const quantity = watch('quantity');
  const buyValue = watch('buyValue');

  useEffect(() => {
    if (resource) {
      const calculatedTT = quantity * resource.value;
      const calculatedExtraCost =
        calculatedTT > 0 ? buyValue - calculatedTT : 0;
      const costPercentage = calculatedTT > 0 ? buyValue / calculatedTT : 0;

      setCalculatedValues({
        calculatedTT,
        calculatedExtraCost,
        costPercentage,
      });
    }
  }, [quantity, buyValue]);

  const onSubmit = (values: BuyFormType) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
      <h4>{resource?.name}</h4>

      <div className={styles.formContent}>
        <div className={styles.formValues}>
          <HookFormInputField
            control={control}
            name='quantity'
            type='number'
            label='quantité'
            className={styles.quantity}
          />{' '}
          <HookFormInputField
            control={control}
            name='buyValue'
            type='number'
            label='Prix achat'
            className={styles.buyValue}
          />
        </div>
        <div className={styles.calulatedValues}>
          <p>
            <span>Cout TT : </span>
            {calculatedValues.calculatedTT}
            <span>ped(s)</span>
          </p>

          <p>
            <span>Extra TT : </span>
            {calculatedValues.calculatedExtraCost} <span>ped(s)</span>
          </p>

          <p>
            <span>Extra % : </span>
            {calculatedValues.costPercentage}
            <span>%</span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default BuyForm;
