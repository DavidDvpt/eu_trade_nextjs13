import { getStockState } from '@/features/stock/stockSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { getTransactionState } from '@/features/transaction/transactionSlice';
import { postTransactionThunk } from '@/features/transaction/transactionThunks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Item, SessionState, TradingType } from '@prisma/client';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ResourceTitle from '../../../components/common/ResourceTitle';
import Button from '../../../components/form/Button';
import HookFormInputField from '../../../components/form/HookFormInputField';
import LastTransaction from './LastTransaction';
import {
  TransactionFormValidation,
  initialCalculatedValues,
  initialTransactionFormValues,
} from './constant';
import styles from './transactionForm.module.scss';

interface ITransactionFormProps {
  item: Item | null;
  type: TradingType;
}

function TransactionForm({
  item,
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
    if (item) {
      setValue('resourceId', item.id);
    }
    if (type) {
      setValue('transactionType', type);
    }
    if (type === TradingType.SELL) {
      setValue('sellStatus', SessionState.PROGRESS);
    }
  };

  const isFulfilled = () => {
    reset();
    setDatas();
  };

  useEffect(() => {
    setDatas();
  }, [item, type]);

  const quantity = watch('quantity');
  const value = watch('value');
  const fee = watch('fee');

  useEffect(() => {
    if (item) {
      const calculatedTT = quantity * item.value;
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
  }, [quantity, value, fee, item]);

  const onSubmit = (values: TransactionFormType) => {
    if (isValid) {
      dispatch(postTransactionThunk({ body: values, callback: isFulfilled }));
    }
  };

  return (
    <div className={styles.transactionForm}>
      <ResourceTitle resource={item} />

      {lastTransaction && type === TradingType.SELL && (
        <>
          <LastTransaction item={lastTransaction} />
          <h5>Nouvelle vente</h5>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.buyForm}>
        <div className={styles.formContent}>
          <div className={styles.formValues}>
            <HookFormInputField
              control={control}
              name='quantity'
              type='number'
              label='quantité'
              className={`${styles.quantity} ${
                errors.quantity ? styles.error : ''
              }`}
              disabled={Boolean(!item)}
              trigger={trigger}
              error={errors.quantity}
            />
            {type === TradingType.SELL && (
              <HookFormInputField
                control={control}
                name='fee'
                type='number'
                label='Fee'
                className={styles.fee}
                disabled={Boolean(!item)}
              />
            )}
            <HookFormInputField
              control={control}
              name='value'
              type='number'
              label={
                type === TradingType.SELL ? 'Prix de vente' : "Prix d'achat"
              }
              className={styles.buyValue}
              disabled={Boolean(!item)}
            />
          </div>

          <div className={styles.calculatedValues}>
            <p>
              <span>Cout TT : </span>
              {Number(calculatedValues.calculatedTT).toFixed(2)}
              <span>ped(s)</span>
            </p>

            {type === TradingType.BUY && (
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
            {type === TradingType.SELL && (
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
          {type === TradingType.BUY ? 'Acheter' : 'Mettre en vente'}
        </Button>
      </form>
    </div>
  );
}

export default TransactionForm;
