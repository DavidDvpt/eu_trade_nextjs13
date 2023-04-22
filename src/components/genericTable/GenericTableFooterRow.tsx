import { nanoid } from '@reduxjs/toolkit';

interface IGenericFooterTableRowProps<T> {
  cells: any;
  headers: GenericHeadersTableType<T>;
}

function GenericTableFooterRow<T>({
  cells,
  headers,
}: IGenericFooterTableRowProps<T>): JSX.Element {
  return (
    <tr key={nanoid()}>
      {headers.map((h) => (
        <td key={nanoid()}>{cells[h.key] as string}</td>
      ))}
    </tr>
  );
}

export default GenericTableFooterRow;
