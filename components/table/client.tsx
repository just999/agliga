'use client';

// import { useParams, useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

import useModal from '@/hooks/use-modal';
import { Schedule } from '@prisma/client';
import useRunToggleStore from '@/store/use-table-store';
import { useSearchParams } from 'next/navigation';
import { runData } from '@/lib/helper';
import { FixtureProps } from '@/types';
import { parseAndFormatDate } from '@/lib/utils';
import { useGetEPLFixtures } from '@/hooks/use-get-schedule';
import { useEffect, useState } from 'react';
import {
  fetchEPL2122,
  fetchEPL2223,
  fetchEPL2324,
  fetchEPL2425,
} from '@/lib/queries/fixtures';

// import ApiList from '@/components/ui/api-list';

interface ScheduleClientProps {
  data?: any;
  euroTableClassName?: string;
  tableCellClassName?: string;
  period?: string;
}

const ScheduleClient = ({
  data,
  euroTableClassName,
  tableCellClassName,
  period,
}: ScheduleClientProps) => {
  // const router = useRouter();
  // const params = useParams();
  // const [newFiltered, setNewFiltered] = useState<FixtureProps | []>([]);
  const params = useSearchParams();
  const week = params.get('week');

  // useEffect(() => {
  //   const fetchEPL = async () => {
  //     let filteredEPL;
  //     if (period === '21-22') {
  //       const res = await fetchEPL2122();
  //       filteredEPL = res?.filter((fix) => fix.name === '21-22');
  //     } else if (period === '22-23') {
  //       const res = await fetchEPL2223();
  //       filteredEPL = res?.filter((fix) => fix.name === '22-23');
  //     } else if (period === '23-24') {
  //       const res = await fetchEPL2324();
  //       filteredEPL = res?.filter((fix) => fix.name === '23-24');
  //     } else if (period === '24-25') {
  //       const res = await fetchEPL2425();
  //       filteredEPL = res?.filter((fix) => fix.name === '24-25');
  //     }
  //     setNewFiltered(filteredEPL);
  //   };
  //   fetchEPL();
  // }, []);
  // if (!data) return [];

  const filteredWeekData =
    Array.isArray(data) &&
    data.filter((dat: { week: number }) => dat.week === Number(week));
  let weekData;
  if (week === null) {
    weekData = data;
  } else if (week) {
    weekData = data.filter(
      (dat: { week: number }) => dat.week === Number(week)
    );
  }

  const { items } = useGetEPLFixtures(period);
  const dateStr = '2021-08-14 11:30:00Z';
  const formattedDate = parseAndFormatDate(dateStr);
  return (
    <div className='pt-20 '>
      {/* <div className='flex items-center justify-between pt-20 '>
        <Heading
          title={`Schedules (${data.length})`}
          description='Manage schedule for your store'
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => onOpen('soccer')}
        >
          <Plus className='mr-2 h-4 w-4 ' />
          Add New
        </Button>
      </div>
      <Separator /> */}
      <DataTable
        period={period}
        euroTableClassName={euroTableClassName}
        tableCellClassName={tableCellClassName}
        searchKey='teamHome'
        columns={columns}
        eu={week === null ? data : filteredWeekData}
      />
      {/* <Heading title='API' description='API calls for Schedules' /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName='schedules' entityIdName='scheduleId' /> */}
    </div>
  );
};

export default ScheduleClient;
