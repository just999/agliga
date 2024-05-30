'use client';

import { cn } from '@/lib/utils';
import { RoutesProps } from '@/types';
import Link from 'next/link';

type UserMenuProps = {
  routes: RoutesProps[];
};

const DepoWdMenu = ({ routes }: UserMenuProps) => {
  return (
    <div className='border w-full md:w-auto rounded-full shadow-sm  transition'>
      <div className=' flex flex-row items-center justify-between h-full'>
        {routes.map(
          ({
            label,
            href,
            onClick,
            active,
            className,
            icon: Icon,
            admin: Admin,
          }) => (
            <Link
              key={label}
              href={href}
              onClick={onClick}
              className={cn(
                `h-full w-full  p-0 m-0 bg-emerald-900  cursor-pointer py-2 hover:shadow-md`,
                className,
                active
                  ? ' text-lime-700  bg-emerald-50 drop-shadow-sm border-b-[3px] border-solid px-3 border-stone-300 transition font-bold'
                  : 'text-stone-400 bg-slate-100 px-3'
              )}
            >
              {label === 'admin' ? <Admin /> : label}
            </Link>
          )
        )}
      </div>
    </div>
  );
};
export default DepoWdMenu;
