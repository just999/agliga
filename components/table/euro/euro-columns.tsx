'use client';

import { ColumnDef } from '@tanstack/react-table';

import { BsCalendar } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { englishPL } from '@/lib/helper';
import { Schedule } from '@prisma/client';
import { convertDateTime } from '@/lib/convert-date-time';

import { Button } from '@/components/ui/button';
import { cn, noto } from '@/lib/utils';

type EuroProps = {
  country: string;
  icon: string;
};

export const euroColumns: ColumnDef<EuroProps>[] = [
  {
    accessorKey: 'country',
    header: '',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start gap-2 px-4'>
        <span className={cn(noto.className)}>{row.original.icon}</span>
        <span className='font-bold text-xs '>{row.original.country}</span>
        {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
      </div>
    ),
  },
  {
    accessorKey: 'played',
    header: 'Played',
    cell: ({ row }) => (
      <div className='flex flex-row justify-center px-4 gap-2 '>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'won',
    header: 'Won',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'drawn',
    header: 'Drawn',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'lost',
    header: 'Lost',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'for',
    header: 'For',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'against',
    header: 'Against',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'goal-diff',
    header: 'Goal-diff',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
  {
    accessorKey: 'points',
    header: 'Points',
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>0</span>
      </div>
    ),
  },
];
