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

type ScheduleProps = {
  searchParams: TFixtureParams;
};

const SchedulePage = async ({ searchParams }: ScheduleProps) => {
  let fixtures;
  const { period, week } = searchParams;
  if (searchParams) {
    fixtures = await fetchFixtureByPeriod(searchParams);
  } else if (searchParams === undefined) {
    fixtures = await fetchFixtures();
  }

  if (Array.isArray(fixtures) && (!fixtures || fixtures.length === 0))
    fixtures = [];

  let epl;
  if (period === '21-22') {
    epl = await fetchEPL2122();
  }
  if (period === '22-23') {
    epl = await fetchEPL2223();
  }
  if (period === '23-24') {
    epl = await fetchEPL2324();
  }
  if (period === '24-25') {
    epl = await fetchEPL2425();
  }

  // const { period } = periodParams;

  // if (period === undefined) return [];

  // let fixtures;
  // if (periodParams) {
  //   fixtures = await fetchFixtureByPeriod(periodParams);
  // }

  // if (Array.isArray(fixtures) && (!fixtures || fixtures.length === 0))
  //   fixtures = [];
  const schedules = await getSoccers();
  if (!schedules) return [];

  const fix = await fetchFixtures();
  if (!fix) return [];
  const fixFiltered = fix.filter((fixture) => fixture.name === period);
  return (
    <div className='container flex-col  absolute inset-x-0 top-0 '>
      <div className='flex flex-col justify-start gap-2 space-y-4  pt-0 '>
        {Array.isArray(epl) && epl && (
          <ScheduleClient
            period={period}
            data={epl}
            euroTableClassName='hidden'
            tableCellClassName='text-xs lg:text-xs '
          />
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
