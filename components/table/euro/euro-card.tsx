'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useModal from '@/hooks/use-modal';
import { convertDateMonthYear, convertDateTime } from '@/lib/convert-date-time';
import { cn, noto } from '@/lib/utils';
import { EuroProps } from '@/types';

import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import EuroCardContent from './euro-card-content';

type EuroCardProps = {
  eu?: {
    date: string;
    games: EuroProps[];
  };
  className?: string;
  groupClassName?: string;
  footerClassName?: string;
  trashClassName?: string;
  euroClassName?: string;
  euroCardDateClassName?: string;
  euCardClassName?: string;
};

const EuroCard = ({
  eu,
  className,
  groupClassName,
  footerClassName,
  trashClassName,
  euroClassName,
  euroCardDateClassName,
  euCardClassName,
}: EuroCardProps) => {
  if (!eu) return <Skeleton />;

  const filterGroupLength = eu.games.filter(
    (it) => convertDateMonthYear(it.date.toISOString()) === eu.date
  ).length;
  const filterGroup = eu.games
    .filter((it) => convertDateMonthYear(it.date.toISOString()) === eu.date)
    .map((t) => t.id);
  return (
    // <div
    //   className={cn(
    //     'w-[240px] rounded-lg bg-orange-50 cursor-pointer embla__slide',
    //     className
    //   )}
    // >
    //   {/* <CardHeader className='hidden '>
    //       <CardTitle>Create project</CardTitle>
    //   <CardDescription>Deploy your new project in one-click.</CardDescription>
    //     </CardHeader> */}
    //   <CardContent className='flex flex-col px-3 pt-2 pb-0 justify-between gap-1'>
    //     <div className='flex flex-row justify-between text-xs '>
    //       <div>{eu.date.toString()}</div>
    //       {/* <div>{eu.status}</div> */}
    //       <pre>{JSON.stringify(eu, null, 2)}</pre>
    //     </div>
    //     <div>
    //       <div className='flex flex-row justify-between '>
    //         <div className='flex flex-row items-center gap-2 '>
    //           <span className={cn(noto.className, 'text-sm')}>
    //             {/* {eu.euroTeamHome.icon} */}
    //           </span>
    //           <span className='text-xs font-bold '>
    //             {/* {eu.euroTeamHome.value} */}
    //           </span>
    //         </div>
    //         {/* <span className='pr-4 '>{eu.homeScore} - </span> */}
    //       </div>
    //       <div className='flex flex-row justify-between '>
    //         <div className='flex flex-row items-center gap-2 '>
    //           <span className={cn(noto.className, 'text-sm')}>
    //             {/* {eu.euroTeamAway.icon} */}
    //           </span>
    //           {/* <span className='text-xs font-bold'>{eu.euroTeamAway.value}</span> */}
    //         </div>
    //         {/* <span className='pr-4 '>{eu.awayScore} - </span> */}
    //       </div>
    //     </div>
    //   </CardContent>
    //   <CardFooter className={cn('flex justify-between pb-2', footerClassName)}>
    //     <div
    //       className={cn(
    //         'mx-auto text-xs font-semibold rounded-md px-4 bg-orange-100',
    //         groupClassName
    //       )}
    //     >
    //       {/* Group {eu.group} */}
    //     </div>
    //     <Button
    //       variant='outline'
    //       size='sm'
    //       className={cn(
    //         'p-0 m-0 w-4 h-4 text-right text-rose-500 bg-sky-100',
    //         trashClassName
    //       )}
    //       // onClick={() => onOpen('delete-euro', eu.id, title)}
    //     >
    //       <BsTrashFill />
    //     </Button>
    //     <Button
    //       // onClick={() => onOpen('edit-euro', eu.id)}
    //       variant='outline'
    //       size='sm'
    //       className={cn(
    //         'p-0 m-0 w-4 h-4 text-right text-sky-500 bg-sky-100',
    //         trashClassName
    //       )}
    //     >
    //       <BsPencilFill />
    //     </Button>
    //     {/* <Button>Deploy</Button> */}
    //   </CardFooter>

    //   {/* <pre>{JSON.stringify(eu.group, null, 2)}</pre> */}
    // </div>
    <div className={cn('flex flex-start ', euCardClassName)}>
      {/* <pre>{JSON.stringify(filterGroupLength, null, 2)}</pre> */}
      {eu.games
        .filter((t) => convertDateMonthYear(t.date.toISOString()) === eu.date)
        .map((it) => (
          <span key={it.id}>
            {/* <pre>{JSON.stringify(it, null, 2)} </pre> */}
            <div className={cn(euroCardDateClassName, 'text-xs font-semibold')}>
              Date: {convertDateMonthYear(it.date.toISOString())}{' '}
            </div>
            <EuroCardContent
              playDate={convertDateMonthYear(it.date.toISOString())}
              className={className}
              groupClassName={groupClassName}
              footerClassName={footerClassName}
              trashClassName={trashClassName}
              it={it}
            />
          </span>
        ))}
    </div>
  );
};

export default EuroCard;
