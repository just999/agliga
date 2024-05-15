'use client';

import { useRouter } from 'next/navigation';

import SidebarItem from './sidebar-item';
import useModal from '@/hooks/use-modal';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BiHome, BiNews, BiSolidLogOut } from 'react-icons/bi';
import { FaFileCirclePlus } from 'react-icons/fa6';
import MenuItem from './menu-item';
import { GiMoneyStack, GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { GrSchedule } from 'react-icons/gr';
import { PiUserPlus } from 'react-icons/pi';
import { Cavatar } from '../cavatar';
import Sci from '../posts/sci';
import { capitalizeFirstCharacter, cn } from '@/lib/utils';
import { MdTopic } from 'react-icons/md';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcDataSheet,
  FcFlowChart,
  FcMoneyTransfer,
  FcNews,
  FcTemplate,
} from 'react-icons/fc';

type SidebarRoutesProps = {
  className?: string;
  iconClass?: string;
  size?: number | string | undefined;
  userMenuClassName?: string;
  extraClassName?: string;
};

const SidebarRoutes = ({
  className,
  iconClass,
  size,
  userMenuClassName,
  extraClassName,
}: SidebarRoutesProps) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { toggle, isOpen, isToggle, onOpen, onClose, modalType } = useModal();
  console.log('🚀 ~ session:', session);
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
      ? `user: ${capitalizeFirstCharacter(session.user.name)}`
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
      onClick: () => {
        onClose();
        router.push('/');
      },
    },
    {
      icon: FcCurrencyExchange,
      label: 'Deposit',
      onClick: () => onOpen('depo'),
    },
    {
      icon: FcMoneyTransfer,
      label: 'WD',
      onClick: () => onOpen('wd'),
    },
    {
      icon: FcNews,
      label: 'Berita',
      onClick: () => {
        onClose();
        router.push('/posts');
      },
    },
    {
      icon: FcDataSheet,
      label: 'Jadwal',
      onClick: () => {
        onClose();
        router.push('/soccer');
      },
    },
    {
      icon: FcCalendar,
      label: 'Input-Jadwal',
      onClick: () => onOpen('soccer'),
    },
    {
      icon: FcTemplate,
      label: 'New-Post',
      onClick: () => onOpen('post'),
    },
    {
      icon: FcFlowChart,
      label: 'New-Topic',
      onClick: () => onOpen('topic'),
    },
    {
      icon: status === 'authenticated' ? AiOutlineLogout : AiOutlineLogin,
      label: status === 'authenticated' ? 'Logout' : 'Masuk',
      onClick: status === 'authenticated' ? handleLogout : handleLogin,
    },
    {
      icon: status === 'authenticated' ? Cavatar : PiUserPlus,
      label: status === 'authenticated' ? user : 'Daftar',
      onClick: status === 'authenticated' ? authentic : handleSignUp,
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col w-full h-1/2 justify-between  cursor-pointer pb-24 2xs:pb-24'
      )}
    >
      <div>
        {session?.user.curUser.role === 'admin'
          ? routes.map((route) => (
              <MenuItem
                key={route.label}
                role={role}
                icon={route.icon}
                label={route.label}
                onClick={route.onClick}
                className={className}
              />
            ))
          : routes
              .filter(
                (r) =>
                  r.label !== 'Input-Jadwal' &&
                  r.label !== 'New-Post' &&
                  r.label !== 'New-Topic'
              )
              .map((route) => (
                <MenuItem
                  key={route.label}
                  role={role}
                  icon={route.icon}
                  label={route.label}
                  onClick={route.onClick}
                  className={className}
                />
              ))}

        <hr />
      </div>
      <span
        className={cn(
          'flex flex-col gap-2 justify-start py-4 shadow-sm rounded-xl',
          iconClass
        )}
      >
        <p className='text-xs pl-2 text-center underline text-zinc-400'>
          Our Social-Media:
        </p>
        <div
          className={cn(
            'flex flex-wrap items-center justify-center gap-2 px-8  bg-stone-100'
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
