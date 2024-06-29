'use client';

import { DataTable } from '@/components/ui/data-table';

import { euroColumns } from './euro-columns';
import { euroRoundColumns } from './euro-round-columns';
import {
  EuroGroupProps,
  EuroProps,
  EuroWithIconProps,
  FixtureProps,
} from '@/types';
import { useEffect, useState } from 'react';
import React from 'react';

import useLeague, { TeamStats } from '@/hooks/use-league';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, fixtureFiltered } from '@/lib/utils';

import { fetchEuroByRound } from '@/lib/queries/euro';

interface EuroClientProps {
  eu?: FixtureProps[] | any;
  data?: any;
  group?: any;
  round?: string;
  items?: EuroWithIconProps[];
  footerClassName?: string;
  euroClassName?: string;
  className?: string;
  euCardClassName?: string;
  trashClassName?: string;
}

const EuroClient = ({
  eu,
  group,
  round,
  data,
  footerClassName,
  euroClassName,
  className,
  euCardClassName,
  trashClassName,
  items,
}: EuroClientProps) => {
  const [dat, setDat] = useState<TeamStats[]>([]);
  const [roundDat, setRoundDat] = useState<any[]>([]);
  // const [dat, setDat] = useState<TeamStats[]>([]);

  useEffect(() => {
    const round = '16';
    const fetchData = async () => {
      const res = await fetchEuroByRound(round);
      if (res) setRoundDat(res);
    };
    fetchData();
  }, []);

  // const table = useLeague(data);
  const table = useLeague(eu);

  // const res = getDataFromMatches(uefaMatches);
  useEffect(() => {
    // if (!data) throw new Error('error fetching data');

    // const flattenedMatches = uefaMatches.flat();

    // const newData: any = getDataFromMatches(data);
    // if (newData) setDat(newData);
    if (table) {
      setDat(table);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);
  // const mergedData = data.reduce((a: any[], c) => {
  //   const match = items.filter((item) => item.group === c.group);

  //   if (match) {
  //     let newMatch;
  //     if (match && c.value) {
  //       newMatch = match.filter((m) => m.euroTeamHome.value === c?.value);
  //     }
  //     a.push({ ...match, ...c });
  //   } else {
  //     a.push(c);
  //   }
  //   return a;
  // }, []);
  // let mergedData = [...data, items];
  // if (!items) return;

  // const filteredData = dat.filter((d) => d.);

  if (!items) return <Skeleton />;

  let itemsFiltered = items.filter((item) => item.group === group);

  const groupArrays = fixtureFiltered(itemsFiltered);

  const selectedColumns = group !== null ? euroColumns : euroRoundColumns;

  return (
    <div
      className={cn(
        'pt-2 border-0 md:w-full',
        group ? 'col-span-1' : 'col-span-2 w-min-[1280px]'
      )}
    >
      <DataTable
        searchKey='teamHome'
        columns={selectedColumns}
        eu={group !== null ? dat : roundDat}
        className={className}
        group={group}
        round={round}
        groupArrays={groupArrays}
        footerClassName={footerClassName}
        euroClassName={euroClassName}
        euCardClassName={euCardClassName}
        trashClassName={trashClassName}
      />
    </div>
  );
};

export default EuroClient;
