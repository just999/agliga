'use client';

import { useSession } from 'next-auth/react';

import MenuItem from './menu-item';

// import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

// import { PiUserPlus } from 'react-icons/pi';

import Sci from '../posts/sci';
import { capitalizeFirstCharacter, cn } from '@/lib/utils';

// import {
//   FcCalendar,
//   FcCurrencyExchange,
//   FcDataSheet,
//   FcFlowChart,
//   FcMoneyTransfer,
//   FcNews,
//   FcTemplate,
// } from 'react-icons/fc';
import useProfileStore from '@/store/use-profile-store';
import { useEffect, useMemo, useState } from 'react';

import { RoutesProps } from '@/types';

type SidebarRoutesProps = {
  className?: string;
  iconClass?: string;
  size?: number | string | undefined;
  userMenuClassName?: string;
  extraClassName?: string;
  routes: RoutesProps[];
};

const SidebarRoutes = ({
  className,
  iconClass,
  size,
  userMenuClassName,
  extraClassName,
  routes,
}: SidebarRoutesProps) => {
  const { data: session, status } = useSession();
  const [preview, setPreview] = useState<string>('');

  let username: string;
  let role: string;

  if (session?.user.name) {
    username = session.user.name;
    role = capitalizeFirstCharacter(session?.user.curUser.role);
  } else if (!session?.user.name) {
    username = '';
  }

  const { item, setItem, isPasswordVerified, setIsPasswordVerified } =
    useProfileStore();
  const { name, bank, accountNumber, email, game, image, phone } =
    session?.user?.curUser || {};
  const newProfile = useMemo(() => {
    return {
      name: session?.user?.curUser?.name || '',
      bank: session?.user?.curUser?.bank || '',
      accountNumber: session?.user?.curUser?.accountNumber || '',
      email: session?.user?.curUser?.email || '',
      game: session?.user?.curUser?.game || '',
      image: session?.user?.curUser?.image || '',
      phone: session?.user?.curUser?.phone || '',
    };
  }, [session?.user?.curUser]);

  useEffect(() => {
    if (image || newProfile) {
      setPreview(image);
      setItem(newProfile);
    }
  }, [image, newProfile, setItem]);

  return (
    <div
      className={cn(
        'flex flex-col w-full h-1/2 justify-between  cursor-pointer pb-2 2xs:pb-2'
      )}
    >
      <nav>
        {session?.user.curUser.role === 'admin'
          ? routes.map((route) => (
              <MenuItem
                key={route.label}
                icon={route.icon}
                label={route.label}
                href={route.href}
                onClick={route.onClick}
                className={className}
                active={route.active}
              />
            ))
          : session?.user.curUser.role === 'user'
          ? routes
              .filter(
                (r) =>
                  r.label !== 'Input-Jadwal' &&
                  r.label !== 'New-Post' &&
                  r.label !== 'New-Topic' &&
                  r.label !== 'Admin' &&
                  r.label !== 'Slider'
              )
              .map((route) => (
                <MenuItem
                  key={route.label}
                  icon={route.icon}
                  label={route.label}
                  href={route.href}
                  onClick={route.onClick}
                  className={className}
                  active={route.active}
                />
              ))
          : routes
              .filter(
                (r) =>
                  r.label !== 'Input-Jadwal' &&
                  r.label !== 'New-Post' &&
                  r.label !== 'New-Topic' &&
                  r.label !== 'Admin' &&
                  r.label !== 'Slider' &&
                  r.label !== 'User Data'
              )
              .map((route) => (
                <MenuItem
                  key={route.label}
                  icon={route.icon}
                  label={route.label}
                  href={route.href}
                  onClick={route.onClick}
                  className={className}
                  active={route.active}
                />
              ))}

        <hr />
      </nav>
      <span
        className={cn(
          'flex flex-col gap-2 justify-start py-2 shadow-sm rounded-xl',
          iconClass
        )}
      >
        <p className='text-xs pl-2 text-center underline text-zinc-400'>
          Our Social-Media:
        </p>
        <div
          className={cn(
            'flex flex-wrap items-center justify-center gap-2 px-4  bg-stone-100'
          )}
        >
          <Sci
            size={size}
            className={cn(
              'flex flex-row gap-2',
              userMenuClassName,
              extraClassName,
              iconClass
            )}
          />
        </div>
      </span>
    </div>
  );
};

export default SidebarRoutes;
