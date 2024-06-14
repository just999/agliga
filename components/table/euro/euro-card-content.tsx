'use client';

import { Euro24 } from '@/components/assets/games/euro24';
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
            <span className='pr-4'>{eu.awayScore} - </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className={cn('flex justify-between py-0', footerClassName)}>
        <div className='flex flex-row items-center h-8'>
          <Euro24 />
          <div
            className={cn(
              'mx-auto text-xs font-semibold rounded-md px-0',
              groupClassName
            )}
          >
            Group {eu.group}
          </div>
        </div>
        {role === 'admin' && (
          <div className='flex gap-4 '>
            <Button
              variant='outline'
              size='sm'
              className={cn(
                'p-0 m-0 w-4 h-4 text-right text-rose-500 bg-sky-200 hover:text-rose-700 hover:bg-sky-200',
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
                'p-0 m-0 w-4 h-4 text-right text-sky-500 bg-sky-200 hover:text-sky-700 hover:bg-sky-200',
                trashClassName
              )}
            >
              <BsPencilFill />
            </Button>
          </div>
        )}
      </CardFooter>

      {/* <pre>{JSON.stringify(eu.group, null, 2)}</pre> */}
    </div>
  );
};

export default EuroCardContent;
