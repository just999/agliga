'use server';

import Loader from '@/components/loader';
// type SchedulePageProps = {
//   run: number;
//   date: string;
//   teamHome: string;
//   vs: string;
//   teamAway: string;
//   analysis: string;
// };

import ScheduleClient from '@/components/table/client';

// import { ScheduleColumn } from '@/components/table/columns';

import { getSoccers } from '@/lib/queries/soccers';

const SchedulePage = async () => {
  // const renderedSchedule: ScheduleColumn[] = schedulePL.map((item, i) => ({
  //   id: item.id,
  //   run: item.run,
  //   date: item.date,
  //   teamHome: item.teamHome,
  //   teamAway: item.teamAway,
  //   analysis: item.analysis,
  // }));

  const schedules = await getSoccers();

  if (!schedules) return [];
  return (
    <div className='container flex-col  absolute inset-x-0 top-0 '>
      <div className='flex flex-col justify-start gap-2 space-y-4  pt-0 '>
        <ScheduleClient data={schedules} euroTableClassName='hidden' />
      </div>
    </div>
  );
};

export default SchedulePage;
