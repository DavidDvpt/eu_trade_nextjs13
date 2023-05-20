import * as yup from 'yup';
export const initialTransactionFormValues: TransactionFormType = {
  itemId: '',
  quantity: 0,
  fee: 0,
  value: 0,
};

export const initialCalculatedValues: FormCalculatedValues = {
  calculatedExtraCost: 0,
  calculatedTT: 0,
  markup: 0,
  benefit: 0,
  markupNet: 0,
};

export const TransactionFormValidation = (maxQty: number) => {
  return yup.object({
    quantity: yup
      .number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .required('Quantité requise')
      .min(0, 'La valeur ne peut pas être négative')
      .when('transactionType', {
        is: 'SELL',
        then: (schema) => schema.max(maxQty, 'Stock insuffisant'),
      }),
    fee: yup.number(),
    value: yup.number().required("Prix d'achat requis").moreThan(0),
  });
};
