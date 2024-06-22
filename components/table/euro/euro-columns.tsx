'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, noto } from '@/lib/utils';
import { EuroProps, EuroTeamSubGroupProps } from '@/types';
import { ITable } from '@/lib/league';
import { TeamStats } from '@/hooks/use-league';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

type TEuroProps = {
  team: {
    drawn: number;
    goalDifference: number;
    goalsAgainst: number;
    goalsScored: number;
    group: string;
    lost: number;
    name: { value: string; icon: string };
    played: number;
    points: number;
    won: number;
  };
  // date?: Date;
  // euroTeamHome: EuroTeamSubGroupProps;
  // homePenalty?: string[];
  // homeScore?: string | null;
  // status?: string;
  // euroTeamAway: EuroTeamSubGroupProps;
  // awayPenalty?: string[];
  // awayScore?: string | null;
  // winner?: EuroTeamSubGroupProps;
  // loser?: EuroTeamSubGroupProps;
  // homeGoalDiff?: number;
  // awayGoalDiff?: number;
};

export const euroColumns: ColumnDef<TeamStats>[] = [
  {
    accessorKey: 'country',
    header: '',
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
