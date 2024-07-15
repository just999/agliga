'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, noto, numberWithCommas } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Depo, DepoProps, DepoWdProps } from '@/types';
import { banks, statuses } from '@/lib/helper';

import CellDepoWdActions from './cell-depo-wd-actions';
import { DepoWdStatusActions } from './depo-wd-status-actions';

export const depoColumns: ColumnDef<DepoWdProps & DepoProps>[] = [
  {
    accessorKey: 'index',
    header: 'No.',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start gap-2 px-4'>
        <span className={cn(noto.className)}>{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal',
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
    header: 'Email',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'bank',
    header: 'Bank',
    cell: ({ row }) => (
      <div className='px-4'>
        <span className='flex flex-row items-center gap-2 font-bold text-slate-400 text-xs'>
          {banks
            .filter((bank) => bank.value === row.original.bank)
            .map((b) => (
              <div key={b.value}>
                <b.icon className='w-5 h-5' />
              </div>
            ))}
          <span className='text-[10px]'>{row.original.bank}</span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'accountNumber',
    header: 'No. rekening',
    cell: ({ row }) => (
      <div className='flex flex-row text-nowrap px-4 gap-2 text-xs'>
        {row.original.accountNumber}
      </div>
    ),
  },
  {
    accessorKey: 'depoAmount',
    header: 'depo Rp.',
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
  },
  {
    accessorKey: 'game',
    header: 'Game',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.game}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'gameUserId',
    header: 'Game userId',
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
    header: 'Ke Bank PT',
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
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className='ml-0 h-3 w-3' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row justify-center px-4 gap-2'>
        <span className='font-bold  text-xs text-nowrap'>
          {row.original.status ? (
            row.original.status
          ) : (
            <span className='text-orange-700/50 italic'>belum process</span>
          )}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <DepoWdStatusActions statuses={statuses} name='depo' />,
    // cell: ({ row }) => <CellDepoWdActions data={row.original} />,
  },
];
