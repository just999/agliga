import { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '../shadcn/ui/card';

type DashboardCardProps = {
  title: string;
  count: number;
  icon: LucideIcon;
};

const DashboardCard = ({ title, count, icon: Icon }: DashboardCardProps) => {
  return (
    <Card className='bg-slate-100 dark:bg-slate-800 p-4 pb-0 shadow-lg'>
      <CardContent>
        <h3 className='text-xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200 '>
          {title}
        </h3>
        <div className='flex gap-5 justify-center items-center '>
          <Icon className='text-slate-500 svg' size={38} />
          <h3 className='text-2xl font-semibold text-slate-500 dark:text-slate-200'>
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
