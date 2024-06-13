'use client';

import { AiOutlineLogin, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../avatar';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import MenuItem from './menu-item';

import { useSession } from 'next-auth/react';
import { RoutesProps, SafeUser } from '@/types';
import useModal from '@/hooks/use-modal';
import { useClickOutside } from '@/hooks/use-click-outside';

import { PiUserCirclePlusLight } from 'react-icons/pi';

import SidebarRoutes from './sidebar-routes';

type UserMenuProps = {
  currentUser?: SafeUser | null;
  status: string;
  routes: RoutesProps[];
};

const UserMenu = ({ currentUser, status, routes }: UserMenuProps) => {
  // const { data: session, status } = useSession();
  const { toggle, isToggle, onOpen } = useModal();

  const ref = useClickOutside(() => {
    if (isToggle) {
      toggle(isToggle);
    }
  });

  return (
    <div className='relative ' ref={ref}>
      <div className='flex flex-row items-center gap-3 '>
        {status !== 'authenticated' && (
          <div
            onClick={() => onOpen('register')}
            className='hidden   md:block  text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 hover:shadow-md  transition cursor-pointer '
          >
            <span className=' flex flex-row gap-1 items-center justify-end '>
              <PiUserCirclePlusLight size={20} />
              <span>Daftar</span>
            </span>
          </div>
        )}
        <div
          onClick={() => toggle(isToggle)}
          className='p-4 md:py-2 md:px-3 border-[1px]  border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:bg-neutral-100 transition'
        >
          <AiOutlineMenu />
          {status === 'authenticated' && (
            <div className='hidden md:block '>
              <Avatar src={currentUser?.image} />
            </div>
          )}
        </div>
      </div>
      {isToggle && (
        <div className='absolute rounded-xl shadow-md 2xl:w-[15vw] xl:w-[15vw] lg:w-[18vw] md:w-[19vw] bg-stone-100 overflow-hidden right-0 top-12 text-sm z-10 sm:w-[20vw] '>
          <div className='flex flex-col cursor-pointer w-full '>
            <SidebarRoutes
              userMenuClassName='flex flex-row items-center justify-center'
              className='h-1/5  border-b-0 '
              iconClass='gap-2  bg-slate-100 text-facebook'
              size={16}
              routes={routes}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
