'use client';

import { cn } from '@/lib/utils';
import Logo from './navbar/logo';
import { ReactNode } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: ReactNode;
  center?: boolean;
};

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={cn(center ? 'text-center' : 'text-start')}>
      <div className='text-2xl font-bold flex flex-row items-center justify-center gap-8 '>
        {' '}
        <Logo
          className='w-10 h-auto'
          styles={{ width: '18%', height: 'auto' }}
        />{' '}
        {title}
      </div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  );
};

export default Heading;
