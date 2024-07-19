'use client';

import { signOut, useSession } from 'next-auth/react';
import Container from '../container';
import Categories from './categories';
import Logo from './logo';

import UserMenu from './user-menu';
import { SafeUser } from '@/types';
import DepoWdMenu from './depo-wd-menu';
// import GamesCategories from './games-categories';
import MobileSidebar from './mobile-sidebar';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

import { BiHome } from 'react-icons/bi';
import { FaUser, FaUserTie } from 'react-icons/fa';
import {
  FcCurrencyExchange,
  FcMoneyTransfer,
  FcNews,
  FcDataSheet,
  FcCalendar,
  FcTemplate,
  FcPanorama,
  FcGallery,
} from 'react-icons/fc';
import { RiAdminLine } from 'react-icons/ri';
import { PiUserPlus } from 'react-icons/pi';
import { redirect, usePathname, useRouter } from 'next/navigation';
import useModal from '@/hooks/use-modal';

import { capitalizeFirstCharacter, cn } from '@/lib/utils';
import { TbScoreboard } from 'react-icons/tb';

import ClientOnly from '@/lib/client-only';

import LanguageDropdown from '../language-dropdown';
import { UeFa } from '../assets/sports/uefa';
import { EPLPeriod } from '@/lib/helper';

type NavbarProps = {
  currentUser?: SafeUser | null;
  className?: string;
};

const Navbar = ({ currentUser, className }: NavbarProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { modalType, onOpen, onClose } = useModal();
  const userRole = session?.user.curUser.role;

  const last = EPLPeriod.at(-1);
  const period = last?.value;
  let username: string;
  let role: string;

  if (session?.user.name) {
    username = session.user.name;

    role = capitalizeFirstCharacter(session?.user.curUser.role);
  } else if (!session?.user.name) {
    username = '';
  }
  let user =
    session?.user && session?.user.name
      ? `${capitalizeFirstCharacter(
          session.user.name
        )} is ${capitalizeFirstCharacter(session.user.curUser.role)}`
      : 'Guest';

  const handleLogout = () => {
    signOut();
    router.push('/');
  };
  const handleLogin = () => onOpen('login');
  const handleSignUp = () => onOpen('register');
  const authentic = () => {
    username;
    onOpen('profile');
  };
  const routes = [
    {
      icon: BiHome,
      label: 'Home',
      onClick: () => {},
      // onClick: () => {
      //   onClose();
      //   router.push('/');
      // },
      href: `/`,
      active: modalType === null && pathname === '/',
      className: ' p-0 m-0 hidden',
    },
    {
      icon: FcCurrencyExchange,
      label: 'Deposit',
      onClick: () => onOpen('depo'),
      href: `${pathname}`,
      active: modalType === 'depo',
      className:
        'text-xs font-semibold  rounded-l-full px-6 py-2 cursor-pointer hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: FcMoneyTransfer,
      label: 'WD',
      onClick: () => onOpen('wd'),
      href: `${pathname} `,
      active: modalType === 'wd',
      className:
        'hidden sm:block text-xs py-2 font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: FcNews,
      label: 'Berita',
      onClick: () => {},
      // onClick: () => {
      //   onClose();
      //   router.push('/posts');
      // },
      href: `/posts`,
      active: modalType === null && pathname === '/posts',
      className:
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: FcDataSheet,
      label: 'Jadwal',
      onClick: () => {},
      href: `/soccer?period=${period}`,
      active: modalType === null && pathname === '/soccer',
      className:
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: FcCalendar,
      label: 'Input-Jadwal',
      onClick: () => onOpen('soccer'),
      href: `${pathname}`,
      active: modalType === 'soccer',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50'
          : 'hidden',
    },
    {
      icon: FcTemplate,
      label: 'New-Post',
      onClick: () => onOpen('post'),
      href: `${pathname}`,
      active: modalType === 'post',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50'
          : 'hidden',
    },
    {
      icon: UeFa,
      label: 'Euro 2024',
      onClick: () => {},
      href: `/euro`,
      active: modalType === null && pathname === '/euro',
      className:
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: FcPanorama,
      label: 'Slider',
      onClick: () => {},
      href: `/sliders`,
      active: modalType === null && pathname === '/sliders',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50'
          : 'hidden',
    },
    {
      icon: RiAdminLine,
      label: 'Admin',
      onClick: () => {},
      href: `/admin`,
      active: modalType === null && pathname === '/admin',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50'
          : 'hidden',
    },
    {
      icon: FaUser,
      label: 'User',
      onClick: () => {},
      href: `/users`,
      active: modalType === null && pathname === '/users',
      className:
        userRole === 'admin' || userRole === 'user'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-6 py-2 border-x-[1px] flex-1 text-center  md:hidden lg:block cursor-pointer hover:shadow-md hover:bg-emerald-50'
          : 'hidden',
    },
    {
      icon: TbScoreboard,
      label: 'Livescore',
      onClick: () => onOpen('live'),
      href: `${pathname} `,
      active: modalType === 'live',
      className:
        'hidden sm:block text-xs bg-slate-50 rounded-r-full py-2  font-semibold px-6 border-x-[1px] flex-1 text-center cursor-pointer h-full hover:shadow-md hover:bg-emerald-50',
    },
    {
      icon: status === 'authenticated' ? AiOutlineLogout : AiOutlineLogin,
      label: status === 'authenticated' ? 'Logout' : 'Masuk',
      onClick: status === 'authenticated' ? handleLogout : handleLogin,
      href: `${pathname}`,
      active: pathname === `/${pathname}`,
      className: ' p-0 m-0 hidden',
    },
    {
      icon: status === 'authenticated' ? FaUserTie : PiUserPlus,
      label: status === 'authenticated' ? user : 'Daftar',
      onClick: status === 'authenticated' ? authentic : handleSignUp,
      href: `${pathname}`,
      active: pathname === `/${pathname}`,
      className: ' p-0 m-0 hidden',
    },
  ];
  return (
    <ClientOnly>
      <div className={cn('relative w-full bg-white z-10', className)}>
        <div className='py-2 border-b-[1px] bg-slate-50 shadow-sm'>
          <Container>
            <MobileSidebar routes={routes} />
            <div className='hidden md:flex flex-1 flex-row items-center justify-between gap-3 md:gap-0 '>
              <Logo
                className='w-10 h-auto '
                styles={{ width: '10%', height: 'auto' }}
              />
              {/* <Search /> */}
              <DepoWdMenu routes={routes} />
              {/* <News /> */}
              <LanguageDropdown />
              <UserMenu
                currentUser={currentUser}
                status={status}
                routes={routes}
              />
            </div>
          </Container>
        </div>
        <Categories />
        {/* <GamesCategories /> */}
      </div>
    </ClientOnly>
  );
};

export default Navbar;
