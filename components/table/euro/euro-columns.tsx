'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, noto } from '@/lib/utils';

import { TeamStats } from '@/hooks/use-league';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const euroColumns: ColumnDef<TeamStats>[] = [
  {
    accessorKey: 'country',
    header: '',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row justify-start gap-2 px-4'>
        <span className={cn(noto.className)}>{row.original.team.icon}</span>
        <span className='font-bold text-xs '>{row.original.team.value}</span>
        {/* <pre>{JSON.stringify(row.original.country?.value, null, 2)}</pre> */}
      </div>
    ),
  },
  {
    accessorKey: 'played',
    header: 'Played',
    enableColumnFilter: false,
    cell: ({ cell, row }) => (
      <div className='flex flex-row justify-center px-4 gap-2 '>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}

          <span>
            {/* <pre>
              {JSON.stringify(
                row.original?.date?.toString() < new Date().toString() ? 1 : 0,
                null,
                2
              )}
            </pre> */}
            {/* {row?.original?.date.toISOString()} */}
          </span>

          {/* <pre>
            {JSON.stringify(
              (row.original?.euroTeamHome?.value ||
                row.original?.euroTeamAway?.value) === row.original?.country
                ? row.original?.id
                : 'none',
              null,
              2
            )}
          </pre> */}
          {row.original.played}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'won',
    header: 'Won',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
          {row.original.won}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'draw',
    header: 'Draw',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2 text-xs'>
        {/* <pre>
          {JSON.stringify(
            Number(row.original.homeScore) === Number(row.original.awayScore)
              ? 1
              : 0,
            null,
            2
          )}
        </pre> */}
        {row.original.drawn}
      </div>
    ),
  },
  {
    accessorKey: 'lost',
    header: 'Lost',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 text-xs gap-2'>
        {/* <pre>
          {JSON.stringify(
            row.original?.loser?.value === row.original.country ? 1 : 0,
            null,
            2
          )}
        </pre> */}
        {row.original.lost}
      </div>
    ),
  },
  {
    accessorKey: 'for',
    header: 'For',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
          {row.original.goalsScored}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'against',
    header: 'Against',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>
            {JSON.stringify(
              row.original?.euroTeamHome?.value === row.original.country
                ? Number(row.original?.awayScore)
                : Number(row.original?.homeScore),
              null,
              2
            )}
          </pre> */}
          {row.original.goalsAgainst}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'goalDiff',
    header: 'GoalDiff',
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>
            {JSON.stringify(
              row.original?.euroTeamHome?.value === row.original.country
                ? Number(row.original?.homeScore) -
                    Number(row.original?.awayScore)
                : Number(row.original?.awayScore) -
                    Number(row.original?.homeScore),
              null,
              2
            )}
          </pre> */}
          {row.original.goalDifference}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'points',
    // header: 'Points',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 '
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Points
          <ArrowUpDown className='ml-0 h-3 w-3' />
        </Button>
      );
    },
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className='flex flex-row  justify-center px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {/* <pre>
            {JSON.stringify(
              row.original?.winner?.value === row.original.country ? 3 : 0,
              null,
              2
            )}
          </pre> */}
          {row.original.points}
        </span>
      </div>
    ),
  },
];
