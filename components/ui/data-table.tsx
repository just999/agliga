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
import { useEffect, useState } from 'react';

import useRunToggleStore from '@/store/use-table-store';
import RunTable from './run-table';
import { cn } from '@/lib/utils';

import useModal from '@/hooks/use-modal';

import { GrEdit } from 'react-icons/gr';
import { BsArrowDownSquare } from 'react-icons/bs';
import EuroCard from '../table/euro/euro-card';
import { useGetEuros } from '@/hooks/use-get-schedule';
import Loader from '../loader';
import { Skeleton } from './skeleton';
import { Euro24 } from '../assets/games/euro24';
import { EuroProps } from '@/types';
import { euroGroup } from '@/lib/helper';
import { Schedule } from '@prisma/client';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?:
    | {
        country: string;
        icon: string;
      }[]
    | Schedule[];
  searchKey?: string;
  className?: string;
  group?: string;
  footerClassName?: string;
  euroClassName?: string;
  euroTableClassName?: string;
  euCardClassName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  group,
  footerClassName,
  euroClassName,
  euroTableClassName,
  euCardClassName,
}: DataTableProps<TData, TValue>) {
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filtering, setFiltering] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const { items, isLoading, error } = useGetEuros();

  // if (!items) return [];
  const table = useReactTable({
    data: data as TData[],
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

  const { toggle, setIsOpen } = useRunToggleStore();
  const { onOpen, setGroup, group: gr } = useModal();
  if (!items || items.length === 0) return <Skeleton />;

  let itemsFiltered = items.filter((item) => item.group === group);
  const groups = itemsFiltered.reduce((groups, game) => {
    const date = new Date(game.date).toLocaleDateString('id-ID').split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {} as { [date: string]: EuroProps[] });
  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      games: groups[date],
    };
  });

  const handleOpenGroup = (group: string | undefined) => {
    onOpen('new-euro');
    // if (group) {
    //   setGroup('new-euro', group);
    // }
  };

  return (
    <div className='drop-shadow-lg rounded-xl'>
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
            <tr
              className={cn(
                'rounded-full h-auto border-none',
                euroTableClassName
              )}
            >
              <th className='flex flex-row font-semibold justify-center ml-2 bg-emerald-200 rounded-l-lg hover:bg-green-300 hover:font-semibold hover:text-gray-800 shadow-xl text-md text-gray-400 cursor-pointer'>
                <Euro24 />
                <Button
                  variant='ghost'
                  size='sm'
                  className='px-0 hover:bg-green-300 hover:font-semibold hover:text-gray-800'
                  onClick={() => handleOpenGroup(group)}
                >
                  Group {group}
                </Button>
              </th>

              {/* <th className='hover:bg-sky-100/50 bg-rose-100'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='rounded-lg px-4 font-semibold  text-md text-gray-400  hover:text-emerald-800 shadow-xl'
                  onClick={() => {
                    console.log(group);
                    onOpen('edit-euro');
                  }}
                >
                  <GrEdit size={24} />
                </Button>
              </th> */}
              <th className='bg-amber-100 rounded-r-lg px-4 font-semibold  hover:bg-sky-100 hover:text-gray-800 hover:font-bold shadow-xl cursor-pointer text-md text-gray-400 '>
                <Button
                  variant='ghost'
                  size='sm'
                  className='px-0'
                  onClick={() => {
                    if (group) {
                      setGroup('new-euro', group);
                    }

                    setIsToggle((prev) => !prev);
                  }}
                >
                  {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
                  <BsArrowDownSquare size={24} />
                </Button>
              </th>
            </tr>

            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=' text-xs text-stone-500 h-8 p-0  text-left px-2 '
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
                  className='h-8 bg-amber-50 even:bg-orange-50 odd:bg-white'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='p-0 text-center lg:text-sm'
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
        {isToggle && (
          <div className='flex  flex-col mx-5 gap-0 py-2 rounded-lg justify-center'>
            {groupArrays.map((item) => (
              <EuroCard
                key={item.games[0].id}
                eu={item}
                className='bg-sky-100 mt-2'
                groupClassName='w-full text-center bg-sky-200 shadow-xl'
                footerClassName={footerClassName}
                euroClassName={euroClassName}
                euCardClassName={euCardClassName}
              />
            ))}

            {/* <pre>{JSON.stringify(groupArrays, null, 2)}</pre> */}
          </div>
        )}
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
