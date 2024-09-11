import { cn } from '@/lib/utils';
import React from 'react';

type IconProps = {
  className?: string;
};

export function Check({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      enableBackground='new 0 0 512 512'
      version='1.1'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      className={cn('w-6 h-auto', className)}
    >
      <path
        fill='#004225'
        d='M433.139 67.108L201.294 298.953c-6.249 6.249-16.381 6.249-22.63 0L78.861 199.15 0 278.011 150.547 428.56a55.766 55.766 0 0078.861 0L512 145.968l-78.861-78.86z'
      ></path>
      <path
        d='M485.921 119.888L187.59 418.22a61.044 61.044 0 01-29.847 16.391 55.755 55.755 0 0032.235 10.28 55.766 55.766 0 0039.43-16.333L512 145.966l-26.079-26.078z'
        opacity='0.1'
      ></path>
    </svg>
  );
}
