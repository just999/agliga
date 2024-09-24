import { getScheduleById } from '@/actions/schedule-actions';
import ScheduleForm from './schedule-form';

type SchedulePageProps = {
  params: {
    scheduleId: string;
  };
};

const SchedulePage = async ({ params }: SchedulePageProps) => {
  // const schedule  = await getScheduleById(params.scheduleId)
  return <ScheduleForm />;
};

export default SchedulePage;
