'use client';

import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description: string;
  className?: string;
}

const Heading = ({ title, description, className }: HeadingProps) => {
  return (
    <div className={cn(className)}>
      <h2 className='text-3xl font-bold tracking-tight '>{title}</h2>
      <p className='text-sm text-muted-foreground '>{description}</p>
    </div>
  );
};

export default Heading;
