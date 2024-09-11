'use client';

import { EuroGroupProps } from '@/types/types';
import EuroClient from '../table/euro/euro-client';

type EuroTeamGroupProps = {
  eu?: EuroGroupProps;
};

const EuroTeamGroup = ({ eu }: EuroTeamGroupProps) => {
  if (!eu) return;
  const group = eu[0].group;
  // let eGroup = eu.filter((euG) => euG.group === 'A') || {
  //   value: '',
  //   icon: '',
  // };
  return (
    <EuroClient
      eu={eu}
      group={group}
      footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
      euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
      className='hidden'
      euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
    />
  );
};

export default EuroTeamGroup;
