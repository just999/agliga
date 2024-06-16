'use server';

import ScheduleClient from '@/components/table/client';

import { getSoccers } from '@/lib/queries/soccers';

const SchedulePage = async () => {
  const schedules = await getSoccers();

  if (!schedules) return [];
  return (
    <div className='container flex-col  absolute inset-x-0 top-0 '>
      <div className='flex flex-col justify-start gap-2 space-y-4  pt-0 '>
        <ScheduleClient
          data={schedules}
          euroTableClassName='hidden'
          tableCellClassName='text-xs lg:text-xs '
        />
      </div>
    </div>
  );
};

export default SchedulePage;
