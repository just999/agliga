'use client';

import { cn } from '@/lib/utils';
import { ClockLoader } from 'react-spinners';

type ClockSpinnerProps = {
  className?: string;
};

const ClockSpinner = ({ className }: ClockSpinnerProps) => {
  return (
    <div
      className={cn(
        'h-[10vh] flex flex-col justify-center items-center',
        className
      )}
    >
      <ClockLoader
        size={100}
        color='cyan'
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default ClockSpinner;
