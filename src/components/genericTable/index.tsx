import { nanoid } from '@reduxjs/toolkit';
import GenericTableBodyRow from './GenericTableBodyRow';
import GenericTableFooterRow from './GenericTableFooterRow';
import GenericTableHeaderRow from './GenericTableHeaderRow';

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
          <GenericTableHeaderRow cells={header} />
        </thead>
        <tbody>
          {rows.map((m) => (
            <GenericTableBodyRow key={nanoid()} row={m} headers={header} />
          ))}
        </tbody>
        {footerRow && (
          <tfoot>
            <GenericTableFooterRow cells={footerRow} headers={header} />
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default GenericTable;
