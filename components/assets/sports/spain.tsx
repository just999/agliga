import { cn } from '@/lib/utils';
import React from 'react';

type FootballClubProps = {
  className?: string;
};

export function Spain({ className }: FootballClubProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      version='1.1'
      viewBox='0 0 500 500'
      xmlSpace='preserve'
      className={cn(className)}
    >
      <path
        fill='#FF2E25'
        fillRule='evenodd'
        d='M500 250c0 137.8-112.2 250-250 250S0 387.8 0 250 112.2 0 250 0s250 112.2 250 250zM250 27.7c-122.3 0-222.3 100-222.3 222.3s100 222.3 222.3 222.3c122.3 0 222.3-100 222.3-222.3S372.3 27.7 250 27.7z'
        clipRule='evenodd'
      ></path>
      <g fill='#FF2E25'>
        <path
          fillRule='evenodd'
          d='M151.7 195.5v29.8h-23.3v-93.2h59.3c13.1 0 23.1 2.8 29.9 8.3 6.8 5.5 10.2 13.3 10.2 23.3v.8c0 7.1-1.7 13.1-5 18.2-2.6 4-6.7 7.2-12.2 9.6l21.4 33.1h-28l-17.4-29.8h-34.9zM187 152h-35.3v23.6h34.1c6.5 0 11.2-.9 14.2-2.7 3-1.8 4.5-4.7 4.5-8.7v-.8c0-4.1-1.4-7-4.1-8.7-2.7-1.8-7.1-2.7-13.4-2.7z'
          clipRule='evenodd'
        ></path>
        <path d='M282.4 225.3v-93.2h96.4V152H307v17.6h64.7v19.2H307v36.5h-24.6zM282.4 367.9v-93.2h96.4v19.9H307v17.6h64.7v19.2H307v36.5h-24.6zM128.4 274.7h100.2v19.9H153v16.1h66v19.2h-66V348h76.4v19.9h-101v-93.2z'></path>
      </g>
    </svg>
  );
}
