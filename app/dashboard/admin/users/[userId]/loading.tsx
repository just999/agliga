'use client';

import Spinner from '@/components/shadcn/ui/spinner';
import { cn } from '@/lib/utils';

type SpinnerProps = {
  className?: string;
};

const Loading = ({ className }: SpinnerProps) => {
  return (
    <span className='h-full w-full flex flex-col items-center justify-center'>
      <Spinner
        size={40}
        className={cn('w-full h-full vertical-center z-999', className)}
      />
    </span>
  );
};

export default Loading;
