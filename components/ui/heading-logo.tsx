'use client';

import { cn } from '@/lib/utils';
import Logo from '../navbar/logo';
import { CSSProperties, ReactNode } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;

  styles?: CSSProperties;
};

const HeadingLogo = ({
  title,
  subtitle,
  center,
  className,

  styles,
}: HeadingProps) => {
  return (
    <div className={cn(center ? 'text-center' : 'text-start')}>
      <div
        className={cn(
          'text-2xl font-bold flex flex-row items-center justify-center gap-8',
          className
        )}>
        <Logo
          styles={styles ? styles : { width: '18%', height: 'auto' }}
          className={cn('w-10 h-auto svg')}
        />
        {title}
      </div>
      <div className='font-light text-neutral-500 mt-2 px-5'>{subtitle}</div>
    </div>
  );
};
export default HeadingLogo;
