import HookFormInputField from '@/components/form/HookFormInputField';
import { Resource } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './buyForm.module.scss';
import { initialValues } from './constants';
interface IBuyFormProps {
  resource: Resource | null;
}

function BuyForm({ resource }: IBuyFormProps) {
  const [ttCost, setTtCost] = useState<number>(0);
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
      const value = +watch('quantity');
      setTtCost(value * resource?.value);
    }
  }, [watch('quantity')]);

  useEffect(() => {
    if (resource) {
      setValue('resourceId', resource.id);
    }
  }, [resource]);

  const onSubmit = (values: BuyFormType) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
      <fieldset>
        <label htmlFor='name'>Ressource</label>
        <input type='text' name='name' value={resource?.name} disabled />
      </fieldset>
      <HookFormInputField
        control={control}
        name='quantity'
        type='number'
        label='quantité'
      />
      <fieldset>
        <label htmlFor='name'>Prix TT</label>
        <input type='text' name='name' disabled value={ttCost} />
      </fieldset>
      <HookFormInputField
        control={control}
        name='sellValue'
        type='number'
        label='Prix vente'
      />
    </form>
  );
}

export default BuyForm;
