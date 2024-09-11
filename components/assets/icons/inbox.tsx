import React from 'react';
import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
};
export function Inbox({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      width='80'
      height='80'
      enableBackground='new 0 0 309.268 309.268'
      version='1.1'
      viewBox='0 0 309.268 309.268'
      className={cn('w-6 h-auto', className)}
      xmlSpace='preserve'>
      <path
        fill='#F4B459'
        d='M57.988 106.312H251.28l57.988 57.988H0l57.988-57.988z'></path>
      <path
        fill='#D07C40'
        d='M67.652 125.641h173.963l48.323 48.323s-3.866 48.323-10.631 48.323H28.027c-5.799 0-8.698-48.323-8.698-48.323l48.323-48.323z'></path>
      <path
        fill='#F4B459'
        d='M212.621 164.299v19.329c0 10.631-8.698 19.329-19.329 19.329h-77.317c-10.631 0-19.329-8.698-19.329-19.329v-19.329H0v115.975c0 10.631 8.698 19.329 19.329 19.329h270.609c10.631 0 19.329-8.698 19.329-19.329V164.299h-96.646z'></path>
      <path
        fill='#475F6C'
        d='M210.688 77.318h-27.061V19.33c0-5.799-3.866-9.665-9.665-9.665h-38.658c-5.799 0-9.665 3.866-9.665 9.665v57.988h-27.06c-10.631 0-14.497 6.765-9.665 15.463l56.055 55.088c4.832 8.698 13.53 8.698 19.329 0l56.055-55.088c4.832-8.698.966-15.463-9.665-15.463z'></path>
    </svg>
  );
}
