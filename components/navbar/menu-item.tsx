'use client';

import { cn } from '@/lib/utils';
import { ElementType } from 'react';
import { IconType } from 'react-icons';

type MenuItemProps = {
  icon?: IconType;
  onClick: () => void;
  role?: string;
  label: string;
  className?: string;
};

const MenuItem = ({
  onClick,
  label,
  icon: Icon,
  className,
  role,
}: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        `flex whitespace-nowrap flex-row items-center gap-2 px-4 py-3 mx-2 my-1 rounded-lg text-neutral-400  hover:bg-orange-100/30 grayscale hover:grayscale-0 gra  hover:text-stone-900 hover:shadow-md transition font-semibold`,
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
          'hover:text-emerald-800 hover:bg-emerald-50'
      )}
    >
      {Icon && <Icon size={18} />} {label} {label.startsWith('user:') && 'is '}
      {label.startsWith('user:') && role}
    </div>
  );
};

export default MenuItem;
