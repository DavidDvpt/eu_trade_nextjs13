import { ContextType, TransactionType } from '@prisma/client';
import * as yup from 'yup';

export const contextValues = [
  { value: 'TRADE', label: 'Trade' },
  { value: 'MINING', label: 'Mining' },
  { value: 'CRAFTING', label: 'Craft' },
];

export const initialTransactionFormValues: PostTransactionBody = {
  resourceId: '',
  quantity: 0,
  sellStatus: null,
  context: ContextType.TRADE,
  fee: 0,
  value: 0,
  transactionType: TransactionType.BUY,
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
      .transform((value) => (isNaN(value) ? 0 : value))
      .required('Quantité requise')
      .min(0, 'La valeur ne peut pas être négative')
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
