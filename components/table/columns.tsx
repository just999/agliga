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

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: 'run',
    header: 'run',
  },
  {
    accessorKey: 'date',
    cell: ({ row }) => convertDateTime(row.original.date.toISOString()),
  },
  {
    accessorKey: 'teamHome',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-center cursor-pointer '>
        <span className='h-4 w-4  '>
          <Image
            src={
              englishPL
                .filter((team) => team.name === row.original.teamHome)
                .map((item) => item.icon)[0]
            }
            alt={row.original.teamHome}
            width={2}
            height={2}
            priority
            className='h-4 w-auto'
          />
        </span>
        <span>{row.original.teamHome}</span>
      </div>
    ),
  },
  {
    accessorKey: 'score',
    header: 'vs',
  },
  {
    accessorKey: 'teamAway',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-center cursor-pointer '>
        <span className='h-4 w-4  '>
          <Image
            src={
              englishPL
                .filter((team) => team.name === row.original.teamAway)
                .map((item) => item.icon)[0]
            }
            alt={row.original.teamAway}
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
  {
    accessorKey: 'analysisIcon',
    header: 'analysis',
    cell: ({ row }) => (
      <Button size='sm' variant='ghost' type='button'>
        <Link href={row.original.analysis}>
          <BsCalendar className='h-3 w-3 ' />
        </Link>
      </Button>
    ),
  },
  {
    id: 'actions',
    header: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
