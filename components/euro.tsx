'use client';

import { euro } from '@/lib/helper';
import { Noto_Color_Emoji } from 'next/font/google';
import { CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { EuroProps } from '@/types';
import { convertDateTime } from '@/lib/convert-date-time';
import { Badge } from './ui/badge';

type TEuroProps = {
  eu?: EuroProps;
  trashClassName?: string;
};

const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: ['400'],
  preload: true,
});

const Euro = ({ eu, trashClassName }: TEuroProps) => {
  if (!eu) return <Skeleton />;

  const renderedEuro = (
    <div className='w-[200px] '>
      {/* <CardHeader className='hidden '>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader> */}
      <CardContent className='p-0 m-0 flex flex-col '>
        <div className='flex flex-row gap-2 justify-between text-xs '>
          <div>{convertDateTime(eu.date.toISOString())}</div>
          <div>{eu.status}</div>
        </div>
        <div className='flex flex-row justify-between '>
          <div className='flex flex-row items-center gap-2 '>
            <span className={cn(noto.className, 'text-sm')}>
              {eu.euroTeamHome.icon}
            </span>
            <span className='text-xs'>{eu.euroTeamHome.value}</span>
          </div>
          <span className='pr-4'>{eu.homeScore}- </span>
        </div>
        <div className='flex flex-row justify-between '>
          <div className='flex flex-row items-center gap-2 '>
            <span className={cn(noto.className, 'text-sm')}>
              {eu.euroTeamAway.icon}
            </span>
            <span className='text-xs '>{eu.euroTeamAway.value}</span>
          </div>
          <span className='pr-4 '>{eu.awayScore}- </span>
        </div>
      </CardContent>
      <div className='flex justify-center py-2 rounded-full bg-yellow-100 hover:bg-amber-100 hover:shadow-lg'>
        <div className='flex flex-row justify-center w-full text-xs font-semibold px-4 '>
          <Badge variant='outline' className='border-0 shadow-xl'>
            Group {eu.group}
          </Badge>
        </div>
        {/* <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button> */}
      </div>
    </div>
  );

  return (
    <div className='flex flex-col  items-center justify-center bg-amber-50 gap-4 px-2 py-4 rounded-lg  border border-orange-100 border-solid drop-shadow-lg embla__slide cursor-pointer'>
      {renderedEuro}
    </div>
  );
};

export default Euro;
