'use client';

import { ReactNode } from 'react';
import { CardHeader, CardFooter, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

import {
  IoArrowRedoCircleOutline,
  IoArrowUndoCircleOutline,
} from 'react-icons/io5';
import { Button } from './ui';
import { useSession } from 'next-auth/react';

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
  setToggleSidePanel,
}: CardInnerWrapperProps) => {
  // const [toggleSidePanel, setToggleSidePanel] = useState(false);

  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <div className='relative h-full flex justify-end overflow-hidden rounded-t-lg'>
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
        )}>
        <CardHeader
          className={cn(
            'text-stone-600 w-full bg-stone-100 border-none',
            className
          )}>
          {typeof header === 'string' ? (
            <div className={cn('text-shadow', classNameHeader)}>{header}</div>
          ) : (
            <>{header}</>
          )}
        </CardHeader>
        <Separator />
        <div className='bg-amber-400 shadow-inner'>
          <span
            className={cn(
              'w-full flex justify-between text-center shadow-inner bg-yellow-50',
              role === 'user' && 'flex justify-center'
            )}>
            {setToggleSidePanel && role === 'admin' && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setToggleSidePanel(!toggleSidePanel)}
                className='cursor-pointer m-0 p-0 h-6 px-1 hover:text-emerald-600 hover:text-shadow-default hover:shadow-md'>
                {toggleSidePanel ? (
                  <IoArrowUndoCircleOutline
                    className='svg text-stone-400'
                    size={20}
                  />
                ) : (
                  <IoArrowRedoCircleOutline
                    className='svg text-stone-400'
                    size={20}
                  />
                )}
              </Button>
            )}
            <span className='flex gap-2 justify-center w-full py-1 text-gray-600 text-xs font-semibold'>
              <Calendar size={14} className='text-zinc-500' />
              {currentDate}
            </span>
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
