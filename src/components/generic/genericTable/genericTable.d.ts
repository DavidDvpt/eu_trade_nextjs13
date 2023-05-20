type Order = 'asc' | 'desc';
type GenericHeaderTableType<T> = {
  name: string;
  key: keyof T;
  colspan?: number;
  order?: Order;
};

type GenericHeadersTableType<T> = GenericHeaderTableType<T>[];
