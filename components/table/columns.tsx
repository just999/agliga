'use client';

import { convertDateTime } from '@/lib/convert-date-time';
import { englishPL, EPL, penalty, team } from '@/lib/helper';
import { cn, orbit } from '@/lib/utils';
import { FixtureProps } from '@/types/types';
import { Schedule } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCalendar } from 'react-icons/bs';

import { Button } from '../shadcn/ui/button';
import CellAction from './cell-action';

// export const columns: ColumnDef<Schedule>[] = [
export const columns: ColumnDef<FixtureProps>[] = [
  {
    accessorKey: 'week',
    enableColumnFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 text-xs'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Week
          <ArrowUpDown className='ml-0 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.week}</span>,
  },
  {
    accessorKey: 'date',

    enableColumnFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 text-xs'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-0 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <span> {convertDateTime(row.original.date.toLocaleString())}</span>
      </div>
    ),
  },
  {
    accessorKey: 'teamHome',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row gap-2 items-center justify-start pl-4 cursor-pointer'>
        {/* <pre>{JSON.stringify(row.original.homePenalty[0], null, 2)}</pre> */}
        {EPL.filter((team) => team.name === row.original.teamHome).map(
          (it, i) => (
            <it.icon key={i} />
          )
        )}
        <span>{row.original.teamHome}</span>
        {penalty
          .filter((pen) => pen.value === row.original.homePenalty[0])
          .map((hp, i) => (
            <div
              key={i}
              className='flex flex-row gap-1 justify-center items-center'
            >
              <span>{hp.description}</span>
              <span>
                <hp.icon className='h-4 w-auto ' />
              </span>
            </div>
          ))}
        {/* <span>{row.original.homePenalty[0]}</span> */}
      </div>
    ),
  },
  {
    accessorKey: 'homeScore',
    enableColumnFilter: false,
    header: 'H-goal',
    cell: ({ row }) => (
      <div className={cn(' text-gray-700 text-sm font-bold ', orbit.className)}>
        {row.original.homeScore}
      </div>
    ),
  },
  {
    accessorKey: 'awayScore',
    enableColumnFilter: false,
    header: 'A-goal',
    cell: ({ row }) => (
      <div className={cn(' text-gray-700 text-sm font-bold ', orbit.className)}>
        {row.original.awayScore}
      </div>
    ),
  },
  {
    accessorKey: 'teamAway',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex w-full gap-2 items-center justify-start pl-4 cursor-pointer '>
        {penalty
          .filter((pen) => pen.value === row.original.awayPenalty[0])
          .map((hp, i) => (
            <div
              key={i}
              className='flex flex-row gap-1 justify-center items-center'
            >
              <span>{hp.description}</span>
              <span>
                <hp.icon className='h-4 w-auto ' />
              </span>
            </div>
          ))}

        {EPL.filter((team) => team.name === row.original.teamAway).map(
          (it, i) => (
            <it.icon key={i} />
          )
        )}

        <span>{row.original.teamAway}</span>
      </div>
    ),
  },
  // {
  //   accessorKey: 'analysisIcon',
  //   header: 'analysis',
  //   cell: ({ row }) => (
  //     <Button size='sm' variant='ghost' type='button'>
  //       {/* <Link href={row.original.analysis}>
  //         <BsCalendar className='h-3 w-3 ' />
  //       </Link> */}
  //     </Button>
  //   ),
  // },
  {
    id: 'actions',
    enableColumnFilter: false,
    header: 'Actions',
    // cell: ({ row }) => <pre>{JSON.stringify(row, null, 2)}</pre>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
