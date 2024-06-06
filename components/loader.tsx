'use client';

import { cn } from '@/lib/utils';
import { PuffLoader } from 'react-spinners';

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        'h-[10vh] flex flex-col justify-center items-center',
        className
      )}
    >
      <PuffLoader size={100} color='red' />
    </div>
  );
};

export default Loader;
