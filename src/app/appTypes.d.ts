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

type FormCalculatedValues = {
  calculatedTT: number;
  calculatedExtraCost: number;
  markup: number;
  benefit: number;
  markupNet: number;
};
