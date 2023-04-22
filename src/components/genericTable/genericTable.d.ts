type GenericHeaderTableType<T> = {
  name: string;
  key: keyof T;
  colspan?: number;
  order?: 'ASC' | 'DESC';
};

type GenericHeadersTableType<T> = GenericHeaderTableType<T>[];
