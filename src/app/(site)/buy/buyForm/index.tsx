import GenericInput from '@/components/form/GenericInput';
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
    useState<CalcylatedValuesType>(initialCalculatedValues);
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
    // const subbscription = watch((data) => {
    const { quantity, buyValue } = watch();

    console.log(quantity, buyValue);
    if (+quantity * (resource?.value ?? 0) !== calculatedValues.calculatedTT) {
      console.log(
        +quantity * (resource?.value ?? 0) !== calculatedValues.calculatedTT
      );
      setCalculatedValues({
        ...calculatedValues,
        calculatedTT: +quantity * (resource?.value ?? 0),
      });
    }
    if (
      +buyValue - calculatedValues.calculatedTT !==
      calculatedValues.calculatedExtraCost
    ) {
      setCalculatedValues({
        ...calculatedValues,
        calculatedExtraCost: +buyValue * calculatedValues.calculatedTT,
      });
    }
  }, [watch(['quantity', 'buyValue'])]);

  useEffect(() => {
    if (resource) {
      setValue('resourceId', resource.id);
      setCalculatedValues({
        ...calculatedValues,
        resourceName: resource?.name ?? '',
      });
    }
  }, [resource]);

  const onSubmit = (values: BuyFormType) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
      <GenericInput name='resourceName' value={calculatedValues.resourceName} />
      <HookFormInputField
        control={control}
        name='quantity'
        type='number'
        label='quantité'
      />
      <GenericInput name='calculatedTT' value={calculatedValues.calculatedTT} />
      <HookFormInputField
        control={control}
        name='buyValue'
        type='number'
        label='Prix achat'
      />
      <GenericInput
        name='calculatedExtraCost'
        value={calculatedValues.calculatedTT}
      />
    </form>
  );
}

export default BuyForm;
