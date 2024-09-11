'use client';

import { cn } from '@/lib/utils';
import { useMessageStore } from '@/store/use-message-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

type NavLinkProps = {
  label: string;
  href: string;
  onClick: () => void;
  active: boolean;
  className?: string;
  icon?: IconType;
};

const NavLink = ({
  label,
  href,
  onClick,
  active,
  className,
  icon: Icon,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href
      ? ' text-lime-700  bg-emerald-50 drop-shadow-sm border-b-2 border-solid px-3 border-b-emerald-600 transition font-bold'
      : 'text-stone-400 bg-slate-100 px-3';
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  return (
    <Link href={href} className={cn(isActive, className)} onClick={onClick}>
      <div
        className={cn(
          'flex flex-row gap-1 text-stone-900 text-[14px] text-center text-nowrap'
        )}>
        {label}
        {href === '/messages' && unreadCount > 0 && (
          <span className='ml-1'>({unreadCount})</span>
        )}
      </div>
    </Link>
  );
};

export default NavLink;
