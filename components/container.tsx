'use client';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        'container max-w-[2520px] justify-center flex-grow mx-auto xl:px-20 md:px-10 sm:px-2 px-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
