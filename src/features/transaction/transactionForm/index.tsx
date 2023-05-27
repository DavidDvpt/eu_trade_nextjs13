import Button from '@/components/form/Button';
import HookFormInputField from '@/components/form/HookFormInputField';
import { globalActions } from '@/features/global/globalSlice';
import { getStockState } from '@/features/stock/stockSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Item, SellStatus, TransactionType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTransactions from '../useTransactions';
import {
  TransactionFormValidation,
  initialCalculatedValues,
  initialTransactionFormValues,
} from './constant';
import styles from './transactionForm.module.scss';

interface ITransactionFormProps extends IToReload {
  item: Item | null;
  type: TransactionType;
}

function TransactionForm({
  item,
  type,
  toReload,
}: ITransactionFormProps): React.ReactElement {
  const { itemQty } = useAppSelector(getStockState);
  const { createTransaction } = useTransactions();
  const [calculatedValues, setCalculatedValues] =
    useState<FormCalculatedValues>(initialCalculatedValues);

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
    resolver: yupResolver(TransactionFormValidation(itemQty.result)),
  });

  const dispatch = useAppDispatch();

  const setDatas = () => {
    if (item) {
      setValue('itemId', item.id);
    }
  };

  useEffect(() => {
    setDatas();
  }, [item, type]);

  const quantity = watch('quantity') ?? 0;
  const value = watch('value') ?? 0;
  const fee = watch('fee') ?? 0;

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

  const onSubmit = async (values: TransactionFormType) => {
    if (isValid) {
      if (type) {
        const extendedValues = {
          ...values,
          type,
          sellStatus:
            type === TransactionType.SELL ? SellStatus.PROGRESS : null,
        };

        await createTransaction(extendedValues);

        reset();
        setDatas();

        if (toReload) {
          dispatch(globalActions.addReload(toReload));
        }
      }
    }
  };

  return (
    <section className={styles.transactionForm}>
      <h5>Nouvelle vente</h5>

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
            {
              <HookFormInputField
                control={control}
                name='fee'
                type='number'
                label='Fee'
                className={styles.fee}
                disabled={Boolean(!item)}
              />
            }
            <HookFormInputField
              control={control}
              name='value'
              type='number'
              label={
                type === TransactionType.SELL ? 'Prix de vente' : "Prix d'achat"
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
    </section>
  );
}

export default TransactionForm;
