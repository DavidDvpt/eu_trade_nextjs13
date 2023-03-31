import * as yup from 'yup';
export const initialValues: BuyFormType = {
  resourceId: '',
  quantity: 0,
  buyValue: 0,
  transactionType: 'BUY',
};

export const initialCalculatedValues: BuyFormCalculatedValues = {
  calculatedExtraCost: 0,
  calculatedTT: 0,
  costPercentage: 0,
};

export const buyFormValidation = yup.object({
  resourceId: yup.string().required(),
  quantity: yup.number().required('Quantité requise').moreThan(0),
  buyValue: yup.number().required("Prix d'achat requis").moreThan(0),
  transactionType: yup.string().required(),
});
