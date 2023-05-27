type SelectType = {
  value: string;
  label: string | import('react').ReactElement;
};
type SelectTypes = SelectType[];

interface IChildren {
  children: import('react').ReactNode;
}

interface IId {
  id: string;
}

interface IToReload {
  toReload?: ReloadActionEnum[];
}

type FormCalculatedValues = {
  calculatedTT: number;
  calculatedExtraCost: number;
  markup: number;
  benefit: number;
  markupNet: number;
};

type TransactionBenefitResult = {
  buy: number;
  feeLost: number;
  sellBenefit: number;
  total;
};
