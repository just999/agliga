'use server';

import ScheduleClient from '@/components/table/client';
import ClientOnly from '@/lib/client-only';
import {
  fetchEPL2122,
  fetchEPL2223,
  fetchEPL2324,
  fetchEPL2425,
  fetchFixtureByPeriod,
  fetchFixtures,
  TFixtureParams,
} from '@/lib/queries/fixtures';

import { getSoccers } from '@/lib/queries/soccers';
// import { parseAndFormatDate } from '@/lib/utils';

type ScheduleProps = {
  searchParams: TFixtureParams;
};

const SchedulePage = async ({ searchParams }: ScheduleProps) => {
  let fixtures;
  const { period } = searchParams;
  if (searchParams) {
    fixtures = await fetchFixtureByPeriod(searchParams);
  } else if (searchParams === undefined) {
    fixtures = await fetchFixtures();
  }

  if (Array.isArray(fixtures) && (!fixtures || fixtures.length === 0))
    fixtures = [];
  // const { period } = periodParams;

  // if (period === undefined) return [];

  // let fixtures;
  // if (periodParams) {
  //   fixtures = await fetchFixtureByPeriod(periodParams);
  // }

  // if (Array.isArray(fixtures) && (!fixtures || fixtures.length === 0))
  //   fixtures = [];

  // const year1 = period?.slice(0, 2);
  // const year2 = period?.slice(3, 5);
  // const get = `${year1}-${year2}`;
  const schedules = await getSoccers();
  if (!schedules) return [];
  const fix = await fetchFixtures();
  if (!fix) return [];
  const fixFiltered = fix.filter((fixture) => fixture.name === period);
  let filteredEPL;
  if (period === '21-22') {
    const res = await fetchEPL2122();
    filteredEPL = res?.filter((fix) => fix.name === '21-22');
  } else if (period === '22-23') {
    const res = await fetchEPL2223();
    filteredEPL = res?.filter((fix) => fix.name === '22-23');
  } else if (period === '23-24') {
    const res = await fetchEPL2324();
    filteredEPL = res?.filter((fix) => fix.name === '23-24');
  } else if (period === '24-25') {
    const res = await fetchEPL2425();
    filteredEPL = res?.filter((fix) => fix.name === '24-25');
  }

  // const dateStr = '2021-08-13 19:00:00Z';
  // const formattedDate = parseAndFormatDate(dateStr);
  return (
    <div className='container flex-col  absolute inset-x-0 top-0 '>
      <div className='flex flex-col justify-start gap-2 space-y-4  pt-0 '>
        <ScheduleClient
          period={period}
          data={filteredEPL}
          // data={schedules}
          euroTableClassName='hidden'
          tableCellClassName='text-xs lg:text-xs '
        />
      </div>
    </div>
  );
};

export default SchedulePage;
