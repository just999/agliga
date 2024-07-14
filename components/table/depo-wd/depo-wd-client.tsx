'use client';

import { DataTable } from '@/components/ui/data-table';

import {
  EuroGroupProps,
  EuroProps,
  EuroWithIconProps,
  FixtureProps,
  DepoWdProps,
  DepoProps,
  WdProps,
} from '@/types';
import { useEffect, useState } from 'react';
import React from 'react';

import useLeague, { TeamStats } from '@/hooks/use-league';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, fixtureFiltered } from '@/lib/utils';

import { fetchEuroByRound } from '@/lib/queries/euro';
// import DepoWdTable from '@/components/ui/depo-wd-table';
import { fetchDepo } from '@/lib/queries/depo-wd';
import { depoWdColumns } from './depo-wd-columns';
import useModal from '@/hooks/use-modal';

interface DepoWdClientProps {
  depo?: DepoWdProps[] | any[];
  data?: any;
  group?: any;
  round?: string;
  items?: EuroWithIconProps[];
  footerClassName?: string;
  euroClassName?: string;
  className?: string;
  depoWdClassName?: string;
  tableCellClassName?: string;
  euCardClassName?: string;
  trashClassName?: string;
}

const DepoWdClient = ({
  depo,
  group,
  round,
  data,
  footerClassName,
  euroClassName,
  className,
  depoWdClassName,
  euCardClassName,
  trashClassName,
  items,
}: DepoWdClientProps) => {
  const [dep, setDep] = useState<DepoWdProps[]>([]);
  // const [roundDat, setRoundDat] = useState<any[]>([]);
  // const [dat, setDat] = useState<TeamStats[]>([]);

  useEffect(() => {
    if (!depo) return;
    setDep(depo);
  }, [depo]);

  const { modalType } = useModal();
  // const table = useLeague(data);
  // const table = useLeague(depo);

  // const res = getDataFromMatches(uefaMatches);
  // useEffect(() => {
  //   // if (!data) throw new Error('error fetching data');

  //   // const flattenedMatches = uefaMatches.flat();

  //   // const newData: any = getDataFromMatches(data);
  //   // if (newData) setDat(newData);
  //   if (table) {
  //     setDat(table);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [table]);
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

  // if (!items) return <Skeleton />;

  // let itemsFiltered = items.filter((item) => item.group === group);

  // const groupArrays = fixtureFiltered(itemsFiltered);

  // const selectedColumns = group !== null ? euroColumns : euroRoundColumns;

  const filteredDepo = dep.filter((de: DepoProps) => de.depoAmount);
  const filteredWd = dep.filter((we: WdProps) => we.wdAmount);
  return (
    <div className={cn('flex flex-col pt-2 border-0 md:w-full')}>
      <DataTable
        searchKey='email'
        columns={depoWdColumns}
        eu={filteredDepo}
        className={className}
        depoWdClassName={depoWdClassName}
        // group={group}
        // round={round}
        // groupArrays={groupArrays}
        footerClassName={footerClassName}
        euroClassName={euroClassName}
        euCardClassName={euCardClassName}
        trashClassName={trashClassName}
      />
    </div>
  );
};

export default DepoWdClient;
