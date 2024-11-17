'use client';

import React, { ReactNode } from 'react';

import { capitalizeFirstCharacter, cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  IoArrowRedoCircleOutline,
  IoArrowUndoCircleOutline,
} from 'react-icons/io5';

import { Button } from './shadcn/ui';
import { CardContent, CardFooter, CardHeader } from './shadcn/ui/card';
import { Separator } from './shadcn/ui/separator';

type CardInnerWrapperProps = {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
  className?: string;
  classNameContentFooter?: string;
  contentclassname?: string;
  classNameFooter?: string;
  classNameHeader?: string;
  currentDate?: string;
  sidePanel?: ReactNode;
  toggleSidePanel?: boolean;
  setToggleSidePanel?: (toggleSidePanel: boolean) => void;
  currentUser?: User;
};

const CardInnerWrapper = ({
  header,
  body,
  footer,
  className,
  classNameContentFooter,
  contentclassname,
  classNameFooter,
  classNameHeader,
  currentDate,
  sidePanel,
  toggleSidePanel,
  currentUser,
  setToggleSidePanel,
}: CardInnerWrapperProps) => {
  // const [toggleSidePanel, setToggleSidePanel] = useState(false);

  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <div className='h-full flex justify-end overflow-hidden rounded-t-lg'>
      {/* <ul
        className={cn(
          'absolute left-0 top-0 h-full w-10 flex flex-col justify-center transition-transform duration-300 ease-in-out transform items-center gap-4 backdrop-blur-xl border-0 rounded-tl-lg bg-white/50 ',
          toggleSidePanel
            ? 'translate-x-0 rounded-l-lg'
            : 'translate-x-full  rounded-tl-lg'
        )}>
        {sidePanel}
      </ul> */}
      <div
        className={cn(
          'w-full h-full border border-1 border-orange-100 z-999 rounded-bl-2xl rounded-tl-lg shadow-xl',
          toggleSidePanel
            ? 'border-l-2 border-solid border-amber-400'
            : 'shadow-lg border-l-2 border-transparent'
        )}
      >
        <CardHeader
          className={cn(
            'text-stone-600 w-full bg-stone-100 border-none',
            className
          )}
        >
          {typeof header === 'string' ? (
            <div className={cn('text-shadow', classNameHeader)}>{header}</div>
          ) : (
            <>{header}</>
          )}
        </CardHeader>
        <Separator />
        <div className='bg-amber-400 shadow-inner '>
          <span
            className={cn(
              'w-full flex justify-between text-center shadow-inner bg-yellow-50',
              role === 'user' && 'flex justify-center'
            )}
          >
            {setToggleSidePanel && role === 'admin' && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setToggleSidePanel(!toggleSidePanel)}
                className='cursor-pointer m-0 p-0 h-6 px-1 hover:text-emerald-600 hover:text-shadow-default hover:shadow-md'
              >
                {toggleSidePanel ? (
                  <IoArrowUndoCircleOutline
                    className='svg text-stone-400 hover:text-white hover:bg-orange-300 rounded-full p-.5 hover:text-shadow'
                    size={20}
                  />
                ) : (
                  <IoArrowRedoCircleOutline
                    className='svg text-stone-400 hover:text-white hover:bg-orange-300 rounded-full p-.5 hover:text-shadow'
                    size={20}
                  />
                )}
              </Button>
            )}
            <div className='flex justify-end w-full items-center px-2'>
              <span className='flex gap-2 justify-center w-full py-1 text-gray-600 text-xs font-semibold'>
                <Calendar size={14} className='text-zinc-500' />
                {currentDate}
              </span>
              <span className='text-[10px] text-center text-nowrap px-2 font-semibold bg-sky-600 text-shadow rounded-lg text-white'>
                {currentUser?.name &&
                  capitalizeFirstCharacter(currentUser?.name)}
              </span>
            </div>
            <div />
          </span>

          <div className={cn(classNameContentFooter)}>
            <CardContent className={cn(contentclassname)}>
              <span>{body}</span>
            </CardContent>
            {footer && (
              <CardFooter className={cn(classNameFooter)}>{footer}</CardFooter>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInnerWrapper;
