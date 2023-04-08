import { createTransaction } from '@/lib/axios/requests/transaction';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resource, SellStatus, TransactionType } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../form/Button';
import HookFormInputField from '../form/HookFormInputField';
import ResourceTitle from '../ResourceTitle';
import {
  initialCalculatedValues,
  initialTransactionFormValues,
  TransactionFormValidation,
} from './constant';
import styles from './transactionForm.module.scss';

interface ITransactionFormProps {
  resource: Resource | null;
  type: TransactionType;
}

function TransactionForm({
  resource,
  type,
}: ITransactionFormProps): React.ReactElement {
  const queryClient = useQueryClient();
  const [calculatedValues, setCalculatedValues] =
    useState<FormCalculatedValues>(initialCalculatedValues);
  const {
    formState: { isValid, errors },
    watch,
    setValue,
    reset,
    handleSubmit,
    control,
  } = useForm<TransactionFormType>({
    defaultValues: initialTransactionFormValues,
    resolver: yupResolver(TransactionFormValidation),
  });

  const setDatas = () => {
    if (resource) {
      setValue('resourceId', resource.id);
    }
    if (type) {
      setValue('transactionType', type);
      if (type === TransactionType.SELL) {
        setValue('sellStatus', SellStatus.PROGRESS);
      }
    }
  };

  const { mutate, isLoading } = useMutation(createTransaction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactionList'] });
      reset();
      setDatas();
      return data;
    },
  });

  useEffect(() => {
    setDatas();
  }, [resource]);

  const quantity = watch('quantity');
  const value = watch('value');
  const fee = watch('fee');

  useEffect(() => {
    if (resource) {
      const calculatedTT = quantity * resource.value;
      const calculatedExtraCost = calculatedTT > 0 ? value - calculatedTT : 0;
      const markup = calculatedTT > 0 ? (value / calculatedTT) * 100 : 0;
      const benefit = value - fee - calculatedTT;
      const markupNet = ((value - fee) / calculatedTT) * 100;

      setCalculatedValues({
        calculatedTT,
        calculatedExtraCost,
        markup,
        benefit,
        markupNet,
      });
    }
  }, [quantity, value, resource]);

  console.log(watch(), errors);
  const onSubmit = (values: TransactionFormType) => {
    if (isValid) {
      mutate(values);
    }
  };

  return (
    <div className={styles.transactionForm}>
      <ResourceTitle resource={resource} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
        <div className={styles.formContent}>
          <div className={styles.formValues}>
            <HookFormInputField
              control={control}
              name='quantity'
              type='number'
              label='quantité'
              className={styles.quantity}
              disabled={Boolean(!resource)}
            />
            {type === TransactionType.SELL && (
              <HookFormInputField
                control={control}
                name='fee'
                type='number'
                label='Fee'
                className={styles.fee}
                disabled={Boolean(!resource)}
              />
            )}
            <HookFormInputField
              control={control}
              name='value'
              type='number'
              label='Prix achat'
              className={styles.buyValue}
              disabled={Boolean(!resource)}
            />
          </div>

          <div className={styles.calculatedValues}>
            <p>
              <span>Cout TT : </span>
              {Number(calculatedValues.calculatedTT).toFixed(2)}
              <span>ped(s)</span>
            </p>

            {type === TransactionType.BUY && (
              <p>
                <span>Extra TT : </span>
                {Number(calculatedValues.calculatedExtraCost).toFixed(2)}{' '}
                <span>ped(s)</span>
              </p>
            )}

            <p>
              <span>Markup TTC: </span>
              {Number(calculatedValues.markup).toFixed(2)}
              <span>%</span>
            </p>
            {type === TransactionType.SELL && (
              <>
                <p>
                  <span>Bénéfice NET: </span>
                  {Number(calculatedValues.benefit).toFixed(2)}
                  <span>ped(s)</span>
                </p>
                <p>
                  <span>Markup NET: </span>
                  {Number(calculatedValues.markupNet).toFixed(2)}
                  <span>%</span>
                </p>
              </>
            )}
          </div>
        </div>
        <Button type='submit' primary>
          Acheter
        </Button>
      </form>
    </div>
  );
}

export default TransactionForm;
