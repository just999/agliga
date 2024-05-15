'use client';

import EPLSchedule from '@/components/epl-schedule';
import { englishPL } from '@/lib/helper';

type EngPLPageProps = {};

const EngPLPage = () => {
  return <EPLSchedule teams={englishPL} />;
};

export default EngPLPage;
