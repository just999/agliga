'use client';

import { cn } from '@/lib/utils';
import { PacmanLoader } from 'react-spinners';

type PacmanLoaderProps = {
  className?: string;
};

const PacmanLoaders = ({ className }: PacmanLoaderProps) => {
  return (
    <div
      className={cn(
        'h-[10vh] flex flex-col justify-center items-center',
        className
      )}
    >
      <PacmanLoader size={100} color='orange' margin={10} speedMultiplier={2} />
    </div>
  );
};

export default PacmanLoaders;
