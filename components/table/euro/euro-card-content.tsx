'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useModal from '@/hooks/use-modal';

import { convertDateTime } from '@/lib/convert-date-time';
import { cn, noto } from '@/lib/utils';
import { EuroProps } from '@/types';
import { useSession } from 'next-auth/react';

import { BsTrashFill, BsPencilFill } from 'react-icons/bs';

type EuroCardContentProps = {
  it?: EuroProps;
  className?: string;
  footerClassName?: string;
  groupClassName?: string;
  trashClassName?: string;
  playDate?: string;
};

const EuroCardContent = ({
  trashClassName,
  groupClassName,
  footerClassName,
  className,
  playDate,
  it: eu,
}: EuroCardContentProps) => {
  const { onOpen, group: gr } = useModal();

  const { data: session } = useSession();
  const role = session?.user.curUser.role;

  if (!eu) return <Skeleton />;

  const title = 'Delete Euro Schedule';
  return (
    <div
      className={cn(
        'w-[220px] rounded-lg bg-orange-50 cursor-pointer embla__slide drop-shadow-xl mr-2',
        className
      )}
    >
      {/* <CardHeader className='hidden '>
          <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader> */}
      <CardContent className='flex flex-col px-3 pt-2 pb-0 justify-between gap-1'>
        <div className='flex flex-row justify-between text-xs '>
          <div>{convertDateTime(eu.date.toISOString())}</div>
          <div>{eu.status}</div>
          {/* <pre>{JSON.stringify(eu, null, 2)}</pre> */}
        </div>
        <div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {eu.euroTeamHome.icon}
              </span>
              <span className='text-xs font-bold '>
                {eu.euroTeamHome.value}
              </span>
            </div>
            <span className='pr-4 '>{eu.homeScore} - </span>
          </div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {eu.euroTeamAway.icon}
              </span>
              <span className='text-xs font-bold'>{eu.euroTeamAway.value}</span>
            </div>
            <span className='pr-4 '>{eu.awayScore} - </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className={cn('flex justify-between pb-2', footerClassName)}>
        <div
          className={cn(
            'mx-auto text-xs font-semibold rounded-md px-4 bg-orange-100',
            groupClassName
          )}
        >
          Group {eu.group}
        </div>
        {role === 'admin' && (
          <>
            <Button
              variant='outline'
              size='sm'
              className={cn(
                'p-0 m-0 w-4 h-4 text-right text-rose-500 bg-sky-100',
                trashClassName
              )}
              onClick={() => onOpen('delete-euro', eu.id, title)}
            >
              <BsTrashFill />
            </Button>
            <Button
              onClick={() => onOpen('edit-euro', eu.id)}
              variant='outline'
              size='sm'
              className={cn(
                'p-0 m-0 w-4 h-4 text-right text-sky-500 bg-sky-100',
                trashClassName
              )}
            >
              <BsPencilFill />
            </Button>
          </>
        )}
      </CardFooter>

      {/* <pre>{JSON.stringify(eu.group, null, 2)}</pre> */}
    </div>
  );
};

export default EuroCardContent;
