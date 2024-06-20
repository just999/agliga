'use client';

import { DataTable } from '@/components/ui/data-table';

import { euroColumns } from './euro-columns';
import { EuroGroupProps, EuroWithIconProps } from '@/types';
import { useEffect, useState } from 'react';
import React from 'react';
import ClientOnly from '@/lib/client-only';
// import useLeague, { ITable } from '@/lib/league';
import useLeague, { TeamStats } from '@/hooks/use-league';

interface EuroClientProps {
  eu?: any;
  data?: any;
  group?: any;
  groupArrays?: {
    date: string;
    games: EuroWithIconProps[];
  }[];
  footerClassName?: string;
  euroClassName?: string;
  className?: string;
  euCardClassName?: string;
  trashClassName?: string;
}

const EuroClient = ({
  eu,
  group,
  data,
  groupArrays,
  footerClassName,
  euroClassName,
  className,
  euCardClassName,
  trashClassName,
}: EuroClientProps) => {
  const [dat, setDat] = useState<TeamStats[]>([]);
  // const [dat, setDat] = useState<TeamStats[]>([]);

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

  const sliceGroup = group.slice(1, 2);
  return (
    <div className='pt-2 border-0'>
      <DataTable
        groupArrays={groupArrays}
        searchKey='teamHome'
        columns={euroColumns}
        eu={dat}
        className={className}
        group={group}
        // mergedData={dat}
        footerClassName={footerClassName}
        euroClassName={euroClassName}
        euCardClassName={euCardClassName}
        trashClassName={trashClassName}
      />
    </div>
  );
};

export default EuroClient;
