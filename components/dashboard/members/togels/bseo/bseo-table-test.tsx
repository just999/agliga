'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { BbTabSchema, Bseo4dSchema } from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from 'react-hook-form';
import { useBsColumns } from './bseo-column-test';

type BseoTableTestProps = {
  data: any;
  register?: UseFormRegister<BbTabSchema | any>;
  control?: Control<BbTabSchema | any>;
  watch?: UseFormWatch<BbTabSchema | any>;
  setFocus?: UseFormSetFocus<BbTabSchema>;
  getValues?: UseFormGetValues<BbTabSchema> | any;
  setValue?: UseFormGetValues<BbTabSchema> | any;
  gameData?: Bseo4dSchema;
  bsData?: Bseo4dSchema[];
  i?: number;
};

const BseoTableTest = ({
  data,
  register,
  control,
  watch,
  setFocus,
  getValues,
  setValue,
  gameData,
  bsData,
  i,
}: BseoTableTestProps) => {
  const defaultFilterFns = {
    fuzzy: () => true,
    contains: () => true,
  };

  const { columns } = useBsColumns(data, gameData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    'p-0 m-0 h-8 text-xs font-bold text-center'
                    // header.getContext().header.column.id === 'index' && 'w-8',
                    // header.getContext().header.column.id === 'd1' &&
                    //   'w-8 text-rose-500',
                    // header.getContext().header.column.id === 'd2' && 'w-8',
                    // header.getContext().header.column.id === 'd2' && 'w-8',
                    // header.getContext().header.column.id === 'd2' && 'w-8',
                    // header.getContext().header.column.id === 'game' && 'w-10',
                    // header.getContext().header.column.id === 'wager' && 'w-28'
                    // header.getContext().header.column.id === 'dis' && 'w-12',
                    // header.getContext().header.column.id === 'net' && 'w-28'
                  )}
                  style={{ width: `${header.getSize()}px` }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* <pre>{JSON.stringify(header.getSize(), null, 2)}</pre> */}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    'p-0 m-0'
                    // cell.column.id === 'd1' && 'w-8',
                    // cell.column.id === 'd2' && 'w-8',
                    // cell.column.id === 'd3' && 'w-8',
                    // cell.column.id === 'd4' && 'w-8',
                    // cell.column.id === 'dis' && 'w-12',
                    // cell.column.id === 'bet' && 'w-28',
                    // cell.column.id === 'net' && 'w-28'
                  )}
                  style={{ width: `${cell.column.getSize()}px` }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {/* <pre>{JSON.stringify(cell.column.getSize(), null, 2)}</pre> */}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No Results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className='bg-transparent '>
        {table.getFooterGroups().map((footerGroup) => (
          <TableRow key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <TableCell key={header.id} className='p-0'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    </Table>
  );
};

export default BseoTableTest;
