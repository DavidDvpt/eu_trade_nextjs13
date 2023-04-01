import Button from '@/components/form/Button';
import HookFormInputField from '@/components/form/HookFormInputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resource } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './buyForm.module.scss';
import {
  buyFormValidation,
  initialCalculatedValues,
  initialValues,
} from './constants';

const IMG_URL = process.env.NEXT_PUBLIC_ENTROPEDIA_IMG_BASE_URL;

interface IBuyFormProps {
  resource: Resource | null;
}

function BuyForm({ resource }: IBuyFormProps) {
  const [calculatedValues, setCalculatedValues] =
    useState<BuyFormCalculatedValues>(initialCalculatedValues);
  const {
    formState: { isValid, errors },
    watch,
    setValue,
    handleSubmit,
    control,
  } = useForm<BuyFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(buyFormValidation),
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
      const costPercentage =
        calculatedTT > 0 ? (buyValue / calculatedTT) * 100 : 0;

      setCalculatedValues({
        calculatedTT,
        calculatedExtraCost,
        costPercentage,
      });
    }
  }, [quantity, buyValue, resource]);

  const onSubmit = (values: BuyFormType) => {
    if (isValid) {
      console.log(values);
    }
  };

  return (
    <div className={styles.buyForm}>
      <h4>
        <>
          {resource && (
            <>
              <Image
                src={`${IMG_URL}${resource?.imageUrlId}Original.png`}
                alt='ressource'
                width={20}
                height={20}
              />
              <span>{resource?.name}</span>
            </>
          )}
        </>
      </h4>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
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

          <div className={styles.calculatedValues}>
            <p>
              <span>Cout TT : </span>
              {Number(calculatedValues.calculatedTT).toFixed(2)}
              <span>ped(s)</span>
            </p>

            <p>
              <span>Extra TT : </span>
              {Number(calculatedValues.calculatedExtraCost).toFixed(2)}{' '}
              <span>ped(s)</span>
            </p>

            <p>
              <span>Extra % : </span>
              {Number(calculatedValues.costPercentage).toFixed(2)}
              <span>%</span>
            </p>
          </div>
        </div>
        <Button type='submit' primary>
          Acheter
        </Button>
      </form>
    </div>
  );
}

export default BuyForm;
