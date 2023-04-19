import { nanoid } from '@reduxjs/toolkit';

export type GenericHeaderTableType<T> = {
  name: string;
  key: keyof T;
  colspan?: number;
  order?: 'ASC' | 'DESC';
};
export type GenericHeadersTableType<T> = GenericHeaderTableType<T>[];

interface IGenericTableProps<T> {
  title?: string;
  header: GenericHeadersTableType<T>;
  rows: T[];
  footerRow?: T;
}

function GenericTable<T>({
  header,
  title,
  rows,
  footerRow,
}: IGenericTableProps<T>) {
  return (
    <div>
      {title && <h4>{title}</h4>}{' '}
      <table>
        <thead>
          <tr>
            {header.map((m) => (
              <th key={nanoid()} colSpan={m.colspan ?? 1}>
                {m.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={nanoid()}>
              {header.map((h) => (
                <td key={nanoid()}>{m[h.key] as string | number}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default GenericTable;
