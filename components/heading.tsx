'use client';

import { cn } from '@/lib/utils';
import Logo from './navbar/logo';

type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={cn(center ? 'text-center' : 'text-start')}>
      <div className='text-2xl font-bold flex flex-row items-center justify-center gap-8 '>
        {' '}
        <Logo /> {title}
      </div>
      <div className='font-light text-neutral-500 mt-2 '>{subtitle}</div>
    </div>
  );
};

export default Heading;
