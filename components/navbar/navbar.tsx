'use client';

import { useSession } from 'next-auth/react';
import Container from '../container';
import Categories from './categories';
import Logo from './logo';
import Search from './search';
import UserMenu from './user-menu';
import { SafeUser } from '@/types';
import DepoWdMenu from './depo-wd-menu';
import GamesCategories from './games-categories';
import MobileSidebar from './mobile-sidebar';

type NavbarProps = {
  currentUser?: SafeUser | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  const { data, status } = useSession();
  return (
    <div className='relative w-full bg-white z-10  '>
      <div className='py-4 border-b-[1px] bg-slate-50 shadow-sm'>
        <Container>
          <MobileSidebar />
          <div className='hidden md:flex flex-1 flex-row items-center justify-between gap-3 md:gap-0 '>
            <Logo />
            {/* <Search /> */}
            <DepoWdMenu />
            {/* <News /> */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
      <GamesCategories />
    </div>
  );
};

export default Navbar;
