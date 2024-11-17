'use client';

import { title } from 'process';
import { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui';
import { shioWithIcon, ShioWithIconProps } from '@/lib/helper';
import { cn, oldStandardTT, poppins } from '@/lib/utils';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type ShioCodeTableProps = {};

const defaultFilterFns = {
  fuzzy: () => true,
  contains: () => true,
};
// const columnHelper = createColumnHelper<ShioWithIconProps>();

const columns: ColumnDef<ShioWithIconProps>[] = [
  {
    accessorKey: 'name',
    header: 'Shio',
    cell: (row) => (
      <div className='w-32 flex gap-2 justify-start items-center '>
        <span>
          <row.row.original.icon className='text-sm text-emerald-600 svg' />
        </span>
        <span
          className={cn(
            'text-sm text-teal-600 font-semibold text-shadow',
            poppins.className
          )}
        >
          <span
            className={cn(
              'text-sm text-teal-600 font-semibold',
              poppins.className
            )}
          >
            {row.row.original.name}
          </span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'year',
    header: '',
    cell: (row) => (
      <div>
        {row.row.original.year.map((y, i) => (
          <span key={y} className='justify-center '>
            <span
              className={cn(
                'px-2 text-emerald-500 text-sm font-bold',
                oldStandardTT.className
              )}
            >
              {y}
            </span>
          </span>
        ))}
      </div>
    ),
  },
];

const ShioCodeTable = () => {
  const table = useReactTable({
    data: shioWithIcon,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });
  return (
    <Table className='w-124 '>
      {/* <TableCaption>{title}</TableCaption> */}
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className='h-7 '>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='p-1 '>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No. Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ShioCodeTable;
