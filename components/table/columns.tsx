'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { Button } from '../ui/button';
import { BsCalendar } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { englishPL } from '@/lib/helper';
import { Schedule } from '@prisma/client';
import { convertDateTime } from '@/lib/convert-date-time';
import { FixtureProps } from '@/types';

// export const columns: ColumnDef<Schedule>[] = [
export const columns: ColumnDef<FixtureProps>[] = [
  {
    accessorKey: 'week',
    header: 'week',
  },
  {
    accessorKey: 'date',
    cell: ({ row }) => convertDateTime(row.original.date.toLocaleString()),
  },
  {
    accessorKey: 'home',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-start pl-4 cursor-pointer '>
        <span className='h-4 w-4'>
          <Image
            src={
              englishPL
                .filter((team) => team.name === row.original.teamHome)
                .map((item) => item.icon)[0]
            }
            alt='team away'
            width={2}
            height={2}
            priority
            className='h-4 w-auto'
          />
        </span>
        {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
        <span>{row.original.teamHome}</span>
      </div>
    ),
  },
  {
    accessorKey: 'homeScore',
    header: 'h-goal',
    cell: ({ row }) => <div>{row.original.homeScore}</div>,
  },
  {
    accessorKey: 'awayScore',
    header: 'a-goal',
    cell: ({ row }) => <div>{row.original.awayScore}</div>,
  },
  {
    accessorKey: 'away',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-start pl-4 cursor-pointer '>
        <span className='h-4 w-4  '>
          <Image
            src={
              englishPL
                .filter((team) => team.name === row.original.teamAway)
                .map((item) => item.icon)[0]
            }
            alt='team away'
            width={2}
            height={2}
            priority
            className='h-4 w-auto'
          />
        </span>

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
    header: 'actions',
    // cell: ({ row }) => <pre>{JSON.stringify(row, null, 2)}</pre>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
