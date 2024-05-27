'use client';

import { signOut, useSession } from 'next-auth/react';
import Container from '../container';
import Categories from './categories';
import Logo from './logo';
import Search from './search';
import UserMenu from './user-menu';
import { SafeUser } from '@/types';
import DepoWdMenu from './depo-wd-menu';
import GamesCategories from './games-categories';
import MobileSidebar from './mobile-sidebar';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import {
  FcCurrencyExchange,
  FcMoneyTransfer,
  FcNews,
  FcDataSheet,
  FcCalendar,
  FcTemplate,
  FcFlowChart,
} from 'react-icons/fc';
import { PiUserPlus } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import useModal from '@/hooks/use-modal';

import { capitalizeFirstCharacter, cn } from '@/lib/utils';
import { TbScoreboard } from 'react-icons/tb';

type NavbarProps = {
  currentUser?: SafeUser | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { modalType, onOpen, onClose } = useModal();
  const userRole = session?.user.curUser.role;

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

  const handleLogout = () => signOut();
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
      href: `${pathname}`,
      active: pathname === `/${pathname}`,
      className: ' p-0 m-0 hidden',
    },
    {
      icon: FcCurrencyExchange,
      label: 'Deposit',
      onClick: () => onOpen('depo'),
      href: `${pathname}`,
      active: modalType === 'depo',
      className:
        'hidden p-0 m-0  whitespace-nowrap py-2  sm:block text-xs font-semibold px-3  flex-1 text-center  md:hidden lg:block ',
    },
    {
      icon: FcMoneyTransfer,
      label: 'WD',
      onClick: () => onOpen('wd'),
      href: `${pathname} `,
      active: modalType === 'wd',
      className:
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center md:hidden lg:block',
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
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center md:hidden lg:block',
    },
    {
      icon: FcDataSheet,
      label: 'Jadwal',
      onClick: () => {},
      // onClick: () => {
      //   onClose();
      //   router.push('/soccer');
      // },
      href: `/soccer`,
      active: modalType === null && pathname === '/soccer',
      className:
        'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center md:hidden lg:block',
    },
    {
      icon: FcCalendar,
      label: 'Input-Jadwal',
      onClick: () => onOpen('soccer'),
      href: `${pathname}`,
      active: modalType === 'soccer',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center md:hidden lg:block'
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
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center md:hidden lg:block'
          : 'hidden',
    },
    {
      icon: FcFlowChart,
      label: 'New-Topic',
      onClick: () => onOpen('topic'),
      href: `${pathname} `,
      active: modalType === 'topic',
      className:
        userRole === 'admin'
          ? 'hidden whitespace-nowrap sm:block text-xs font-semibold px-3 border-x-[1px] flex-1 text-center  md:hidden lg:block'
          : 'hidden',
    },
    {
      icon: TbScoreboard,
      label: 'Livescore',
      onClick: () => onOpen('live'),
      href: `${pathname} `,
      active: modalType === 'live',
      className:
        ' p-0 m-0 hidden sm:block py-2 text-xs font-semibold px-3  flex-1 text-center  md:hidden lg:block ',
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
    <div className='relative w-full bg-white z-10  '>
      <div className='py-4 border-b-[1px] bg-slate-50 shadow-sm'>
        <Container>
          <MobileSidebar routes={routes} />
          <div className='hidden md:flex flex-1 flex-row items-center justify-between gap-3 md:gap-0 '>
            <Logo
              className='w-auto h-12 '
              styles={{ width: '10%', height: 'auto' }}
            />
            {/* <Search /> */}
            <DepoWdMenu routes={routes} userRole={userRole} />
            {/* <News /> */}
            <UserMenu
              currentUser={currentUser}
              status={status}
              routes={routes}
            />
          </div>
        </Container>
      </div>
      <Categories />
      <GamesCategories />
    </div>
  );
};

export default Navbar;
