'use client';

import { cn } from '@/lib/utils';
import { ImSpinner9 } from 'react-icons/im';

type SpinnerProps = {
  children?: React.ReactNode;
  size?: number;
  className?: string;
  color?: string;
};

const Spinner = ({ children, size, className, color }: SpinnerProps) => {
  return (
    <span
      className={cn(
        'text-nowrap w-full flex flex-row gap-2 items-center justify-center',
        className
      )}>
      <ImSpinner9
        size={size}
        className={cn('animate-spin text-sky-500', color && `text-${color}`)}
      />
      {children}
    </span>
  );
};
export default Spinner;
