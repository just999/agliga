'use client';

import { cn } from '@/lib/utils';
import { PuffLoader } from 'react-spinners';

type LoaderProps = {
  className?: string;
  size?: number;
  color?: string;
};

const Loader = ({ className, size, color }: LoaderProps) => {
  return (
    <div
      className={cn(
        'h-[10vh] flex flex-col justify-center items-center',
        className
      )}
    >
      <PuffLoader
        size={size ? size : 100}
        color={color ? color : 'red'}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
