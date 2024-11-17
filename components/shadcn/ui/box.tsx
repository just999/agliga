'use client';

import { cn } from '@/lib/utils';

type BoxProps = {
  children: React.ReactNode;
  className: string;
};

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div
      className={cn('p-4 bg-gray-100 rounded-lg shadow-md', className)}
      {...props}>
      {children}
    </div>
  );
};

export default Box;
