import { nanoid } from '@reduxjs/toolkit';

interface IGenericRowProps<T> {
  row: T;
  headers: GenericHeadersTableType<T>;
}

function GenericTableBodyRow<T>({
  row,
  headers,
}: IGenericRowProps<T>): JSX.Element {
  return (
    <tr key={nanoid()}>
      {headers.map((h) => (
        <td key={nanoid()}>{row[h.key] as string}</td>
      ))}
    </tr>
  );
}

export default GenericTableBodyRow;
