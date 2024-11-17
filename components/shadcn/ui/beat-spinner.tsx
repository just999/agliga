'use client';

import { BeatLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

type BeatLoaderProps = {
  className?: string;
};

const BeatSpinner = ({ className }: BeatLoaderProps) => {
  return (
    <div
      className={cn(
        'h-[10vh] flex flex-col justify-center items-center',
        className
      )}
    >
      <BeatLoader color='gray' loading={true} />
    </div>
  );
};

export default BeatSpinner;
