'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, noto, numberWithCommas } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Depo, DepoWdProps, WdProps } from '@/types';
import { banks, games, statuses } from '@/lib/helper';

import CellDepoWdActions from './cell-depo-wd-actions';
import { DepoWdStatusActions } from './depo-wd-status-actions';
import { User } from '@prisma/client';

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'index',
    header: 'No.',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start px-4'>
        <span className={cn('tracking-tighter', noto.className)}>
          {row.index + 1}
        </span>
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
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
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
        <span className='font-bold text-slate-400 text-xs text-nowrap'>
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
    accessorKey: 'phone',
    header: 'phone no',
    cell: ({ row }) => (
      <div className='flex flex-row justify-between px-4 text-xs gap-2'>
        {
          <span className='text-emerald-700 font-bold text-nowrap'>
            {row.original.phone}
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
        <span className='flex gap-4 font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
          {games
            .filter((game) => row.original.game?.includes(game.value))
            .map(({ value, icon: Icon }, i) => (
              <span key={i} className='flex flex-row items-center'>
                <Icon className='w-3 h-auto ' /> <span>{value}</span>
              </span>
            ))}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.role}
        </span>
      </div>
    ),
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div>
        {/* {row.original.status === null ? (
          <DepoWdStatusActions
            statuses={statuses}
            data={row.original}
            name='wd'
          />
        ) : (
          <span>ok!</span>
        )} */}
      </div>
    ),
  },
];
