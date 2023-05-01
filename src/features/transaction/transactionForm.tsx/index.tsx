import HookFormRadioButtons from '@/components/form/HookFormRadioButtons';
import { getStockState } from '@/features/stock/stockSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { getTransactionState } from '@/features/transaction/transactionSlice';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ContextType,
  Resource,
  SellStatus,
  TransactionType,
} from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ResourceTitle from '../../../components/common/ResourceTitle';
import Button from '../../../components/form/Button';
import HookFormInputField from '../../../components/form/HookFormInputField';
import {
  initialCalculatedValues,
  initialTransactionFormValues,
  TransactionFormValidation,
} from './constant';
import LastTransaction from './LastTransaction';
import styles from './transactionForm.module.scss';

interface ITransactionFormProps {
  resource: Resource | null;
  type: TransactionType;
}

function TransactionForm({
  resource,
  type,
}: ITransactionFormProps): React.ReactElement {
  const { singleResourceQty } = useAppSelector(getStockState);
  const { transactions } = useAppSelector(getTransactionState);
  const [calculatedValues, setCalculatedValues] =
    useState<FormCalculatedValues>(initialCalculatedValues);

  const lastTransaction =
    transactions.result && !isEmpty(transactions.result)
      ? transactions.result[0]
      : undefined;

  const {
    formState: { isValid, errors },
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    trigger,
    control,
  } = useForm<TransactionFormType>({
    defaultValues: initialTransactionFormValues,
    resolver: yupResolver(TransactionFormValidation(singleResourceQty.result)),
  });

  const dispatch = useAppDispatch();

  const setDatas = () => {
    if (resource) {
      setValue('resourceId', resource.id);
    }
    if (type) {
      setValue('transactionType', type);
      setValue('context', 'TRADE');
    }
    if (type === TransactionType.SELL) {
      setValue('sellStatus', SellStatus.PROGRESS);
    }
  };

  const isFulfilled = () => {
    reset();
    setDatas();
  };

  useEffect(() => {
    setDatas();
  }, [resource, type]);

  const quantity = watch('quantity');
  const value = watch('value');
  const fee = watch('fee');

  useEffect(() => {
    if (resource) {
      const calculatedTT = quantity * resource.value;
      const calculatedExtraCost = calculatedTT > 0 ? value - calculatedTT : 0;
      const markup = calculatedTT > 0 ? (value / calculatedTT) * 100 : 0;
      const benefit = value - fee - calculatedTT;
      const markupNet =
        calculatedTT > 0 ? ((value - fee) / calculatedTT) * 100 : 0;

      setCalculatedValues({
        calculatedTT,
        calculatedExtraCost,
        markup,
        benefit,
        markupNet,
      });
    }
  }, [quantity, value, fee, resource]);

  const onSubmit = (values: TransactionFormType) => {
    if (isValid) {
      dispatch(postTransactionThunk({ body: values, callback: isFulfilled }));
    }
  };

  return (
    <div className={styles.transactionForm}>
      <ResourceTitle resource={resource} />

      {lastTransaction && type === TransactionType.SELL && (
        <>
          <LastTransaction item={lastTransaction} />
          <h5>Nouvelle vente</h5>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
        <div className={styles.formContent}>
          <div className={styles.formValues}>
            <HookFormRadioButtons
              control={control}
              name='context'
              values={Object.keys(ContextType)}
            />
            <HookFormInputField
              control={control}
              name='quantity'
              type='number'
              label='quantité'
              className={`${styles.quantity} ${
                errors.quantity ? styles.error : ''
              }`}
              disabled={Boolean(!resource)}
              trigger={trigger}
              error={errors.quantity}
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
              label={
                type === TransactionType.SELL ? 'Prix de vente' : "Prix d'achat"
              }
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
          {type === TransactionType.BUY ? 'Acheter' : 'Mettre en vente'}
        </Button>
      </form>
    </div>
  );
}

export default TransactionForm;
