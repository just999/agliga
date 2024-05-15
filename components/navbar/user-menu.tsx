'use client';

import { AiOutlineLogin, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../avatar';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import MenuItem from './menu-item';

import { signOut, useSession } from 'next-auth/react';
import { SafeUser } from '@/types';
import useModal from '@/hooks/use-modal';
import { useClickOutside } from '@/hooks/use-click-outside';
import useRentModal from '@/hooks/use-rent-modal';
// import rentModal from '../modals/rent-modal';
import { useRouter } from 'next/navigation';
import { PiSignIn, PiUserCirclePlusLight } from 'react-icons/pi';
import { useUserRole } from '@/hooks/use-user-role';
import SidebarRoutes from './sidebar-routes';
// import rentModal from '../modals/rent-modal';

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { toggle, isOpen, isToggle, onOpen, onClose, modalType } = useModal();
  const rentModal = useRentModal();

  const ref = useClickOutside(() => {
    if (isToggle) {
      toggle();
    }
  });
  const userRole = useUserRole();

  // const onRent = useCallback(() => {
  //   if (!currentUser) onOpen('register');

  //   // rentModal.onOpen();
  // }, [currentUser, , onOpen]);

  return (
    <div className='relative ' ref={ref}>
      <div className='flex flex-row items-center gap-3 '>
        {!currentUser && status !== 'authenticated' && (
          <div
            onClick={() => onOpen('login')}
            className='hidden   md:block  text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 hover:shadow-md  transition cursor-pointer '
          >
            <span className=' flex flex-row gap-1 items-center justify-end '>
              <PiUserCirclePlusLight size={20} />
              <span>Daftar</span>
            </span>
          </div>
        )}
        <div
          onClick={() => toggle()}
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
        <div className='absolute rounded-xl shadow-md w-[40vw] xl:w-[20vw] lg:w-[25vw] md:w-[30vw] bg-stone-100 overflow-hidden right-0 top-12 text-sm z-10 sm:w-[50vw] '>
          <div className='flex flex-col cursor-pointer w-full '>
            {/* 


{currentUser || status === 'authenticated' ? (
  <>
  <MenuItem label='Deposit' onClick={() => onOpen('depo')} />
  <MenuItem label='WD' onClick={() => onOpen('wd')} />
  <MenuItem
                  label='Berita'
                  onClick={() => router.push('/posts')}
                  />
                  {userRole === 'admin' && (
                    <MenuItem label='New Post' onClick={() => onOpen('post')} />
                    )}
                    <MenuItem
                  label='Live Score'
                  onClick={() => router.push('/live-score')}
                  />
                  
                  <hr />
                  <MenuItem
                  icon={AiOutlineLogout}
                  label='Logout'
                  onClick={() => signOut()}
                  />
                  </>
                  ) : (
                    <>
                <MenuItem
                label='Masuk'
                icon={AiOutlineLogin}
                onClick={() => onOpen('login')}
                />
                <MenuItem
                icon={PiUserCirclePlusLight}
                label='Daftar'
                onClick={() => onOpen('register')}
                />
                </>
                )}
                
                
                
                
              */}

            <SidebarRoutes
              userMenuClassName='flex flex-row items-center justify-center shadow-lg'
              className='h-1/5  border-b-0 '
              iconClass='gap-2  bg-slate-100 text-facebook'
              size={16}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
