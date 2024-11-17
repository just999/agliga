'use client';

import { cn } from '@/lib/utils';

type TogelContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const TogelContainer = ({ children, className }: TogelContainerProps) => {
  return (
    <div
      className={cn(
        'container max-w-144 justify-center flex-grow mx-auto 4xl:px-20 md:px-2 sm:px-2 px-1',
        className
      )}>
      {children}
    </div>
  );
};

export default TogelContainer;
