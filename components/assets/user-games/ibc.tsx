import { cn } from '@/lib/utils';
import React from 'react';

type IconProps = {
  className?: string;
};

export function Ibc({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 65 65'
      className={cn('w-6 h-auto', className)}
    >
      <path d='M43.9 55.4c-2.1-1.4-4.6-4.4-4.5-7.6-2.5-.5-4.7-2.3-5.5-4-.8.1-1.5.2-2.2.3-2.2 7.4 2 14.5 7.6 18.2 1.9 1.3 4.5.7 5.8-1.2s.7-4.5-1.2-5.7zM14.3 25.7c1.7-2 3.8-3 6.3-2.9-2.5-3.8-7.9-4.3-11.1-.9.5.4 1 3.1 4.8 3.8zM15.8 26.9c.9 2.5.7 4.8-.6 6.9h.1c4.5-.4 7.6-4.8 6.3-9.1-.7.3-3.3-.7-5.8 2.2zM13.9 27.6c-2.6-.4-4.5-1.8-5.7-4-2 4.1.3 9 4.7 10.1.2-.7 2.4-2.5 1-6.1z'></path>
      <path d='M64.3 28.9c-3.4-10.1-16.7-14.3-19.5-13.5-3.3.5-5.5 3.3-5.4 6.6.3 5.3-.9 9.2-1.9 11.3-13.4-.5-25.1 7.7-26.4 8.7-1.8 1.4-2.2 4-.9 5.9 1.4 1.8 4 2.3 5.8.9 2.9-2.5 12.1-6.7 19-7 1.3 4.4 7.6 5.9 10.8 2 3-3.6 5.9-10.9 6.1-18.7 2.1 1.4 4.5 3.8 5.4 6.2.7 2 2.8 2.9 4.6 2.3 1.9-.7 3-2.6 2.4-4.7zM7.4 37.6c-2-1-3.8-2.6-5-4.5-.3-.5-.9-.6-1.4-.3s-.6.9-.3 1.4c1.4 2.3 3.5 4.1 5.8 5.3.6.3 1.1 0 1.3-.4.3-.7 0-1.3-.4-1.5zM26.7 26.1c0 .5.5 1 1 1h.1c.5 0 1-.5.9-1.1-.2-3.3-1.5-6.4-3.7-8.8-.4-.4-1-.4-1.4-.1-.4.4-.4 1-.1 1.4 1.9 2.1 3 4.8 3.2 7.6zM40.4 14.6c3.3 0 6.1-2.6 6.3-5.9.3-3.5-2.4-6.5-5.9-6.7s-6.5 2.4-6.7 5.9c-.2 3.6 2.7 6.7 6.3 6.7z'></path>
    </svg>
  );
}
