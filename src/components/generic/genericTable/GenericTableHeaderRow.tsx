import { nanoid } from '@reduxjs/toolkit';

interface IGenericTableHeaderRowProps<T> {
  cells: GenericHeadersTableType<T>;
  className?: string;
}

function GenericTableHeaderRow<T>({
  cells,
}: IGenericTableHeaderRowProps<T>): JSX.Element {
  return (
    <tr>
      {cells.map((m) => (
        <th key={nanoid()} colSpan={m.colspan ?? 1}>
          {m.name}
        </th>
      ))}
    </tr>
  );
}

export default GenericTableHeaderRow;
