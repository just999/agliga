'use client';

import { Button } from '@/components/shadcn/ui/button';
import { convertDateTime } from '@/lib/convert-date-time';
import { cn, noto, orbit } from '@/lib/utils';
import { EuroWithIconProps } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';

import CellAction from './cell-action';

// export const columns: ColumnDef<Schedule>[] = [
export const euroRoundColumns: ColumnDef<EuroWithIconProps>[] = [
  {
    accessorKey: 'round',
    enableColumnFilter: false,
    header: ({ column }) => <span className='w-full text-xs px-2'>Round</span>,
    cell: ({ row }) => <span className='text-xs'>{row.original.round}</span>,
  },
  {
    accessorKey: 'date',
    enableColumnFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 px-2'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className='text-xs'>Date</span>
          <ArrowUpDown className='ml-0 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='px-4 '>
        <span className='text-xs text-nowrap'>
          {' '}
          {convertDateTime(row.original.date.toLocaleString())}
        </span>
        {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
      </div>
    ),
  },
  {
    accessorKey: 'home',
    enableColumnFilter: false,
    header: ({ column }) => <span className='w-full text-xs px-2'>Home</span>,
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-start pl-4 px-4 cursor-pointer'>
        <span className={cn('text-xs', noto.className)}>
          {row.original.euroTeamHome?.icon}
        </span>
        <span className='text-xs'>{row.original.euroTeamHome?.value}</span>
      </div>
    ),
  },
  {
    accessorKey: 'homeScore',
    enableColumnFilter: false,
    header: ({ column }) => (
      <span className='text-xs text-nowrap px-2'>Home-goal</span>
    ),
    cell: ({ row }) => (
      <div
        className={cn(' text-gray-700 text-sm font-bold px-4', orbit.className)}
      >
        {row.original.homeScore}
      </div>
    ),
  },
  {
    accessorKey: 'awayScore',
    enableColumnFilter: false,
    header: ({ column }) => (
      <span className='text-xs text-nowrap px-2'>Away-goal</span>
    ),
    cell: ({ row }) => (
      <div
        className={cn(' text-gray-700 text-sm font-bold px-4', orbit.className)}
      >
        {row.original.awayScore}
      </div>
    ),
  },
  {
    accessorKey: 'away',
    enableColumnFilter: false,
    header: ({ column }) => (
      <span className='text-xs text-nowrap px-2'>away</span>
    ),
    cell: ({ row }) => (
      <div className='flex gap-2 text-xs items-center justify-start pl-4 cursor-pointer px-4'>
        <span className={cn(noto.className, 'text-xs')}>
          {row.original.euroTeamAway.icon}
        </span>
        <span className='text-xs'>{row.original.euroTeamAway.value}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    enableColumnFilter: false,
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
