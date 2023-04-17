import * as yup from 'yup';
export const initialTransactionFormValues: TransactionFormType = {
  resourceId: '',
  quantity: 0,
  sellStatus: null,
  fee: 0,
  value: 0,
  transactionType: null,
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
    resourceId: yup.string().required(),
    quantity: yup
      .number()
      .required('Quantité requise')
      .moreThan(0)
      .when('transactionType', {
        is: 'SELL',
        then: (schema) => schema.max(maxQty, 'Stock insuffisant'),
      }),
    fee: yup.number(),
    value: yup.number().required("Prix d'achat requis").moreThan(0),
    transactionType: yup.string().required(),
  });
};
// , {
//   is: 'SELL',
//   then: yup.number().max(maxQty, 'Stock insuffisant'),
// }
