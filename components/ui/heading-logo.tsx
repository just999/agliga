'use client';

import { cn } from '@/lib/utils';
import Logo from '../navbar/logo';
import { ReactNode } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
};

const HeadingLogo = ({ title, subtitle, center, className }: HeadingProps) => {
  return (
    <div className={cn(center ? 'text-center' : 'text-start')}>
      <div
        className={cn(
          'text-2xl font-bold flex flex-row items-center justify-center gap-8',
          className
        )}>
        <Logo
          className='w-10 h-auto'
          styles={{ width: '18%', height: 'auto' }}
        />
        {title}
      </div>
      <div className='font-light text-neutral-500 mt-2 px-5'>{subtitle}</div>
    </div>
  );
};
export default HeadingLogo;
