'use client';

import { Euro24 } from '@/components/assets/games/euro24';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useModal from '@/hooks/use-modal';

import { convertDateTime } from '@/lib/convert-date-time';
import { cn, noto } from '@/lib/utils';
import { EuroProps, EuroWithIconProps } from '@/types';
import { useSession } from 'next-auth/react';

import { BsTrashFill, BsPencilFill } from 'react-icons/bs';

import Penalty from '@/components/soccer/penalty';

import { useEuros } from '@/hooks/use-euro';

type EuroCardContentProps = {
  it?: EuroWithIconProps;
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
  const { onOpen } = useModal();

  const { data: session } = useSession();
  const role = session?.user.curUser.role;

  const { getTeams } = useEuros();

  const teamsOption = getTeams();

  const home = teamsOption.filter(
    (ta) => ta.value === eu?.euroTeamHome.value
  ) || {
    value: '',
    icon: '',
    group: '',
  };

  const away = teamsOption.filter(
    (ta) => ta.value === eu?.euroTeamAway.value
  ) || {
    value: '',
    icon: '',
    group: '',
  };

  // const filteredHome = useMemo(
  //   () =>
  //     teamsOption
  //       .map((euroTeamHome) => ({
  //         value: euroTeamHome.value,
  //         icon: euroTeamHome.icon,
  //       }))
  //       .filter((th) => th.value === item?.euroTeamHome),
  //   [item?.euroTeamHome, teamsOption]
  // );
  // const home = teamsOption
  //   .map((euroTeamHome) => ({
  //     value: euroTeamHome.value,
  //     icon: euroTeamHome.icon,
  //   }))
  //   .filter((th) => th.value === eu?.euroTeamHome);
  // const away = teamsOption
  //   .map((euroTeamAway) => ({
  //     value: euroTeamAway.value,
  //     icon: euroTeamAway.icon,
  //   }))
  //   .filter((ta) => ta.value === eu?.euroTeamAway);
  if (!eu) return <Skeleton />;

  const title = 'Delete Euro Schedule';
  return (
    <div
      className={cn(
        'w-[220px] rounded-lg bg-orange-50  embla__slide drop-shadow-xl mr-2',
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
          <div>{eu.date > new Date() ? 'Upcoming' : 'Score'}</div>
          {/* <pre>{JSON.stringify(eu.date > new Date(), null, 2)}</pre>
          <pre>{JSON.stringify(new Date(), null, 2)}</pre> */}
        </div>
        <div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {home[0].icon}
              </span>
              <span className='text-xs font-bold '>{home[0]?.value}</span>
              <span className='flex flex-row items-center   gap-1 text-xs font-bold text-gray-500 group'>
                {eu?.homePenalty?.includes('1red') && (
                  <Penalty className=' rounded-[25%] bg-rose-500 block' />
                  // <div className='w-2 h-3 rounded-[25%] bg-rose-500 ' />
                )}
                {eu?.homePenalty?.includes('1yellow') && (
                  <div className='w-2 h-3 rounded-[25%] bg-yellow-500 ' />
                )}
                {eu?.homePenalty?.includes('1penalty') && (
                  <div className='w-2 h-3 text-sm mb-1 text-nowrap '>
                    <span className='absolute invisible group-hover:visible top-0 right-0 text-sky-700 '>
                      Penalty kick
                    </span>
                    <Penalty className='block' penClassName='block' />
                  </div>
                )}
              </span>
            </div>
            <span className='pr-4 text-xs '>
              {eu.homeScore ? eu.homeScore : '-'}
            </span>
          </div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {away[0]?.icon}
              </span>
              <span className='text-xs font-bold '>{away[0].value}</span>
              <span className='flex flex-row items-center group  gap-1 text-xs font-bold text-gray-500'>
                {eu?.awayPenalty?.includes('1red') && (
                  <Penalty className=' rounded-[25%] bg-rose-500 block' />
                  // <div className='w-2 h-3 rounded-[25%] bg-rose-500 ' />
                )}
                {eu?.awayPenalty?.includes('1yellow') && (
                  <div className='w-2 h-3 rounded-[25%] bg-yellow-500 ' />
                )}
                {eu?.awayPenalty?.includes('1penalty') && (
                  <div className='w-2 h-3 text-sm text-gray-700 font-semibold cursor-pointer '>
                    {/* P<span className='text-[10px] '>⚽</span> */}
                    <span className='absolute text-xs bg-emerald-200/10 backdrop-blur-sm px-1 py-0 invisible group-hover:visible top-8 left-12 text-violet-700 rounded-sm'>
                      Penalty kick
                    </span>
                    <Penalty className='block' penClassName='block' />
                  </div>
                )}
              </span>
            </div>
            <span className='pr-4 text-xs'>
              {eu.awayScore ? eu.awayScore : '-'}
            </span>
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

      {/* <pre>{JSON.stringify(eu.id, null, 2)}</pre> */}
    </div>
  );
};

export default EuroCardContent;
