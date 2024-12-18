'use client';

import React, { useEffect, useState } from 'react';

import { DataTable } from '@/components/shadcn/ui/data-table';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import useLeague, { TeamStats } from '@/hooks/use-league';
import useModal from '@/hooks/use-modal';
// import DepoWdTable from '@/components/ui/depo-wd-table';
import { fetchDepo } from '@/lib/queries/depo-wd';
import { fetchEuroByRound } from '@/lib/queries/euro';
import { cn, fixtureFiltered } from '@/lib/utils';
import {
  DepoProps,
  DepoWdProps,
  EuroGroupProps,
  EuroProps,
  EuroWithIconProps,
  FixtureProps,
  WdProps,
} from '@/types/types';
import { User } from '@prisma/client';

import { depoColumns } from './depo-columns';
import { usersColumns } from './users-columns';
import { wdColumns } from './wd-columns';

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
  euroTableClassName?: string;
  euCardClassName?: string;
  trashClassName?: string;
  thClassName?: string;
  tab: string;
  users?: User[];
  role?: string;
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
  tableCellClassName,
  euroTableClassName,
  thClassName,
  items,
  tab,
  users,
  role,
}: DepoWdClientProps) => {
  const [dep, setDep] = useState<DepoWdProps[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  // const [roundDat, setRoundDat] = useState<any[]>([]);
  // const [dat, setDat] = useState<TeamStats[]>([]);

  useEffect(() => {
    if (!depo) return;
    setDep(depo);
  }, [depo]);

  useEffect(() => {
    if (!users || role === 'user') setMembers([]);
    if (users && role === 'admin') setMembers(users);
  }, [users, role]);
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

  const filteredUsers = members.filter((member) => member.role);
  return (
    <div className={cn('flex flex-col border-0 md:w-full')}>
      <DataTable
        searchKey='bank'
        columns={
          tab === 'depo' ? depoColumns : tab === 'wd' ? wdColumns : usersColumns
        }
        eu={
          tab === 'depo'
            ? filteredDepo
            : tab === 'wd'
              ? filteredWd
              : filteredUsers
        }
        className={className}
        depoWdClassName={depoWdClassName}
        // group={group}
        // round={round}
        // groupArrays={groupArrays}
        footerClassName={footerClassName}
        euroClassName={euroClassName}
        euCardClassName={euCardClassName}
        trashClassName={trashClassName}
        tableCellClassName={tableCellClassName}
        thClassName={thClassName}
        euroTableClassName={euroTableClassName}
      />
    </div>
  );
};

export default DepoWdClient;
