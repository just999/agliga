'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

import { IconType } from 'react-icons';

type MenuItemProps = {
  icon?: IconType;
  onClick?: () => void;
  label: string;
  className?: string;
  href: string;
  active?: boolean;
};

const MenuItem = ({
  onClick,
  label,
  icon: Icon,
  className,
  href,
  active,
}: MenuItemProps) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        `flex whitespace-nowrap flex-row items-center gap-3 px-4 py-1 mx-2 my-1 rounded-lg text-neutral-400  hover:bg-orange-100/30 grayscale hover:grayscale-0 hover:text-stone-900 hover:shadow-md transition font-semibold`,
        className,
        label === 'Logout' && 'hover:text-red-500 hover:bg-rose-50',
        label === 'Home' && 'hover:text-violet-800 hover:bg-violet-50',
        (label === 'Deposit' ||
          label === 'WD' ||
          label === 'Berita' ||
          label === 'Jadwal') &&
          'hover:text-blue-800 hover:bg-sky-50',
        (label === 'Input-Jadwal' ||
          label === 'New-Post' ||
          label === 'New-Topic') &&
          'hover:text-emerald-800 hover:bg-emerald-50',
        active
          ? ' text-blue-600 grayscale-0 bg-rose-50 shadow-md transition font-semibold'
          : 'text-muted-foreground bg-slate-100'
      )}
    >
      {/* <Link
        href={href}
        className={cn(
          'text-sm text-stone-900 font-medium transition-colors  hover:bg-sky-50 w-full',
          active
            ? 'text-red-500 dark:text-white bg-sky-50 '
            : 'text-muted-foreground'
        )}
      > */}
      {Icon && <Icon size={18} />}
      <span className={cn('text-stone-900')}>{label} </span>
      {/* </Link> */}
      {/* {Icon && <Icon size={18} />}
      <span className={cn('text-stone-900')}>{label} </span> */}
    </Link>
  );
};

export default MenuItem;
