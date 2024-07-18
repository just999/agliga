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
import { useGetFixtures } from '@/hooks/use-get-schedule';
// import ApiList from '@/components/ui/api-list';

interface ScheduleClientProps {
  data: FixtureProps[];
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
  const params = useSearchParams();
  const week = params.get('week');
  const { onOpen, id } = useModal();
  const { toggle } = useRunToggleStore();

  const { isLoading, error, item, items, setItems, setIsLoading } =
    useGetFixtures(id ? id : undefined, period);
  const filteredWeekData = data.filter((dat) => dat.week === Number(week));
  let weekData;
  if (week === null) {
    weekData = data;
  } else if (week) {
    weekData = data.filter((dat) => dat.week === Number(week));
  }
  return (
    <div className='pt-48 w-4/6 mx-auto'>
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
        searchKey={`teamAway` && `teamHome`}
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
