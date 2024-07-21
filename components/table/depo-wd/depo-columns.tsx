'use client';

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  sortingFns,
  getSortedRowModel,
} from '@tanstack/react-table';

import { cn, noto, numberWithCommas, poppins } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Depo, DepoProps, DepoWdProps } from '@/types';
import { banks, games, statuses } from '@/lib/helper';

import CellDepoWdActions from './cell-depo-wd-actions';
import { DepoWdStatusActions } from './depo-wd-status-actions';

// A TanStack fork of Kent C. Dodds' match-sorter library that provides ranking information
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import footer from '@/components/footer';

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// Function to calculate the total DepoAmount
const calculateDepoAmountSum = (rows: any[]) => {
  return rows.reduce((sum, row) => sum + (row.original.depoAmount || 0), 0);
};

export const depoColumns: ColumnDef<DepoWdProps & DepoProps>[] = [
  {
    accessorKey: 'index',
    header: 'No.',
    enableColumnFilter: false,
    // filterFn: 'equalsString', //note: normal non-fuzzy filter column - exact match required
    cell: ({ row }) => (
      <div className='flex flex-row justify-start  px-4'>
        <span className={cn('tracking-tighter', poppins.className)}>
          {row.index + 1}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Tanggal</span>
    ),
    filterFn: 'includesStringSensitive',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start px-4 gap-2'>
        <span className='font-bold text-slate-400 text-[10px] text-nowrap'>
          {row.original.createdAt?.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Email</span>
    ),
    filterFn: 'includesString',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.email}
        </span>
      </div>
    ),
    // footer: 'email',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Name</span>
    ),
    filterFn: 'fuzzy',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
          {row.original.name}
        </span>
      </div>
    ),
    // footer: 'name',
  },
  {
    accessorKey: 'bank',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Bank</span>
    ),
    // filterFn: 'includesStringSensitive', // case sensitive
    filterFn: 'includesString', // case insensitive
    cell: ({ row }) => (
      <div className='px-4'>
        <span className='flex flex-row items-center gap-2 font-bold text-slate-400 text-xs'>
          {banks
            .filter((bank) => bank.value === row.original.bank)
            .map((b) => (
              <div key={b.value}>
                <b.icon className='w-6 h-6' />
              </div>
            ))}
          <span className='text-[10px]'>{row.original.bank}</span>
        </span>
      </div>
    ),
    // footer: (info) => <div>{info.column.id}</div>,
  },
  {
    accessorKey: 'accountNumber',
    header: 'No. rekening',
    cell: ({ row }) => (
      <div className='flex flex-row text-nowrap px-4 gap-2 text-xs'>
        {row.original.accountNumber}
      </div>
    ),
    footer: (info) => (
      <span className='flex flex-row justify-end w-full '>Total</span>
    ),
  },
  {
    accessorKey: 'depoAmount',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 m-0 h-4 text-xs mr-2'
        // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Depo Rp.
        {/* <ArrowUpDown className='ml-0 h-3 w-3' /> */}
      </Button>
    ),
    sortingFn: fuzzySort,
    cell: ({ row }) => (
      <div className='flex flex-row justify-between px-4 text-xs gap-2'>
        <span className='italic text-stone-400 '>Rp.</span>
        {
          <span className='text-emerald-700 font-bold '>
            {numberWithCommas(row.original.depoAmount)}
          </span>
        }
      </div>
    ),
    filterFn: 'fuzzy',
    footer: (info) => {
      const totalDepoAmount = calculateDepoAmountSum(
        info.table.getRowModel().rows
      );
      return (
        <div className='flex flex-row w-full m-0 p-0 justify-between  text-xs gap-2'>
          <span className='italic text-stone-400 '>Rp.</span>
          <span className='text-emerald-700 font-bold '>
            {numberWithCommas(totalDepoAmount)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'game',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Game</span>
    ),
    filterFn: 'includesString',
    cell: ({ row }) => (
      <div className='flex flex-row px-2 gap-2'>
        <span className='flex flex-row items-center font-bold gap-2 px-2 text-slate-400 text-xs'>
          {games
            .filter((game) => game.value === row.original.game)
            .map((b) => (
              <div key={b.value}>
                <b.icon className='w-4 h-4' />
              </div>
            ))}
          {row.original.game}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'gameUserId',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Game userId</span>
    ),
    filterFn: 'includesString',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.gameUserId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'bankPT',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Ke BankPt</span>
    ),
    filterFn: 'includesString',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='flex flex-row gap-2 items-center font-bold text-slate-400 text-xs'>
          {banks
            .filter((bank) => bank.value === row.original.bankPT)
            .map((b) => (
              <div key={b.value}>
                <b.icon className='w-5 h-5' />
              </div>
            ))}
          <span className='text-[10px]'>{row.original.bankPT}</span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    // header: 'status',
    header: ({ column }) => (
      <span className='p-0 m-0 h-4 text-xs mr-2'>Status</span>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row justify-start px-2 gap-2'>
        <span className='flex flex-row gap-2 items-center font-bold text-xs'>
          {statuses
            .filter((stat) => stat.value === row.original.status)
            .map((b) => (
              <div
                key={b.value}
                className='flex items-center px-2 gap-2 text-nowrap '
              >
                <span>
                  <b.icon
                    className={cn(
                      'w-5 h-5',
                      b.styles,
                      b.value === 'gagal' && 'text-pink-600',
                      b.value === 'in progress' && 'text-blue-700'
                    )}
                  />
                </span>
                <span
                  className={cn(
                    'text-xs',
                    b.styles,
                    b.value === 'gagal' && 'text-pink-600 font-extrabold',
                    b.value === 'in progress' && 'text-blue-700  font-extrabold'
                  )}
                >
                  {b.value}
                </span>
              </div>
            ))}
          {/* <span className='font-bold text-gray-700 text-xs text-nowrap'>
            {row.original.status ? (
              ''
            ) : (
              <span className='text-orange-700/50 italic'>belum process</span>
            )}
          </span> */}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'actions',
    filterFn: 'includesString',
    cell: ({ row }) => (
      <div className='px-2'>
        {row.original.status === 'new' ? (
          <DepoWdStatusActions
            statuses={statuses}
            name='depo'
            data={row.original}
          />
        ) : (
          <>
            <span className='text-shadow  shadow-gray-100'>ok!</span>
            {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
          </>
        )}
      </div>
    ),
    // cell: ({ row }) => <CellDepoWdActions data={row.original} />,
  },
];
