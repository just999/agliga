'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

import useModal from '@/hooks/use-modal';
import { Schedule } from '@prisma/client';
import useRunToggleStore from '@/store/use-table-store';
// import ApiList from '@/components/ui/api-list';

interface ScheduleClientProps {
  data: Schedule[];
}

const ScheduleClient = ({ data }: ScheduleClientProps) => {
  // const router = useRouter();
  // const params = useParams();
  const { onOpen } = useModal();

  const { run } = useRunToggleStore();
  const filteredRunningData = data.filter((dat) => dat.run === run);
  let runData;
  if (run === null) {
    runData = data;
  } else if (run) {
    runData = data.filter((dat) => dat.run === run);
  }

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
        searchKey='teamHome'
        columns={columns}
        data={run === null ? data : filteredRunningData}
      />
      {/* <Heading title='API' description='API calls for Schedules' /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName='schedules' entityIdName='scheduleId' /> */}
    </div>
  );
};

export default ScheduleClient;
