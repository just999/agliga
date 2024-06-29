import { cn } from '@/lib/utils';
import React from 'react';

type RedProps = {
  className?: string;
};

export function Red({ className }: RedProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1024'
      height='1707'
      fill='none'
      viewBox='0 0 1024 1707'
      className={cn('h-6 w-6', className)}
    >
      <g clipPath='url(#clip0_73_2)'>
        <path
          fill='#EB3030'
          d='M316 .933A341.552 341.552 0 0016 238c-5.067 16.133-9.6 36-12.933 56.667C.8 309.333.667 334.4.667 853.333c0 518.937.133 543.997 2.4 558.667 1.333 8.4 3.866 21.6 5.6 29.33 28.4 127.2 129.466 228.27 256.666 256.67 37.467 8.4 24.934 8 246.667 8s209.2.4 246.667-8c127.2-28.4 228.266-129.47 256.663-256.67 1.74-7.73 4.27-20.93 5.6-29.33 2.27-14.67 2.4-39.73 2.4-558.667 0-518.933-.13-544-2.4-558.666-12.4-78.134-44.13-142.134-96.797-194.8-51.6-51.6-114-83.067-190.4-96.134C716.667.8 716 .8 519.333.667 410.8.533 319.333.667 316 .933z'
        ></path>
      </g>
      <defs>
        <clipPath id='clip0_73_2'>
          <path fill='#fff' d='M0 0H1024V1706.67H0z'></path>
        </clipPath>
      </defs>
    </svg>
  );
}
