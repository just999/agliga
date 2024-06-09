'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { InputCustom } from './inputCustom';
import { Button } from './button';
import { useState } from 'react';

import useRunToggleStore from '@/store/use-table-store';
import RunTable from './run-table';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import useModal from '@/hooks/use-modal';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  className?: string;
  group?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  className,
  group,
}: DataTableProps<TData, TValue>) {
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // state: {
    //   columnFilters,
    // },
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const { isOpen, toggle, setIsOpen, run } = useRunToggleStore();
  const { onOpen } = useModal();
  return (
    <div className='shadow-lg '>
      <div
        className={cn(
          'flex flex-row items-center py-2 bg-orange-50/60 border border-solid border-orange-100 rounded-lg',
          className
        )}
      >
        <InputCustom
          placeholder='Search...'
          value={filtering}
          // value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => setFiltering(event.target.value)}
          className='max-w-sm text-stone-700 mx-2 bg-zinc-50'
        />
      </div>
      <RunTable
        toggle={toggle}
        setIsOpen={() => setIsOpen}
        className={cn(className)}
      />
      <div className='rounded-md  '>
        <Table className='bg-amber-50 border-none '>
          <TableHeader className='bg-amber-50 '>
            <tr className='bg-stone-50 rounded-full w-full h-auto border-none'>
              <th>
                <Button
                  variant='ghost'
                  size='sm'
                  className='rounded-lg px-4 font-semibold  text-md text-gray-400 hover:bg-sky-100/50 hover:text-gray-800 shadow-xl'
                  onClick={() => {
                    console.log(group);
                    onOpen('new-euro', group);
                  }}
                >
                  {group}
                </Button>
              </th>
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=' text-sm text-stone-500 h-12 p-0  text-left pl-5 '
                    >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='h-12 bg-amber-50'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='text-xs  p-0 text-center  lg:text-sm'
                      style={{ height: '18px' }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {/* <pre>{JSON.stringify(cell, null, 2)}</pre> */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-12 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={cn(
          'flex items-center justify-end space-x-2 py-4 pr-4',
          className
        )}
      >
        <Button
          variant='ghost'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={cn(
            'w-1/12 bg-amber-100 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg',
            !table.getCanPreviousPage() && 'text-zinc-600'
          )}
        >
          Previous
        </Button>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={cn(
            'w-1/12 bg-amber-100 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg',
            !table.getCanNextPage() && 'text-zinc-600'
          )}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
