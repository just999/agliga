import { cn } from '@/lib/utils';
import { LogInIcon, UserRoundPlus } from 'lucide-react';

import { Button } from '../ui/button';
import Categories from './categories';

import Logo from './logo';

import Container from '../container';
import { auth } from '@/auth';
import { adminLinks, userLinks } from '@/lib/helper';

import Link from 'next/link';
import NavLink from './nav-link';
import UserNavMenu from './user-nav-menu';
import { getUserInfoForNav } from '@/actions/user-actions';

type TopNavProps = {
  className?: string;
  searchParams?: {
    container: string;
  };
};
const TopNav = async ({ className, searchParams }: TopNavProps) => {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  const container = searchParams?.container || 'inbox';

  const links = session?.user.role === 'admin' ? adminLinks : userLinks;
  const resolvedLinks = links.map((link) => ({
    ...link,
    href: typeof link.href === 'function' ? link.href(container) : link.href,
  }));

  return (
    <nav className={cn('relative w-full bg-white z-10 ', className)}>
      <div className='py-2 border-b-[1px] bg-slate-50 shadow-sm'>
        <Container>
          {/* TODO: MOBILE SIDEBAR */}
          <div className='hidden md:flex flex-1 flex-row items-center justify-between gap-3 md:gap-0 '>
            <Logo
              className='w-30 h-auto svg'
              styles={{ width: '90px', height: 'auto' }}
            />

            <div className='border w-full md:w-auto rounded-full shadow-sm  transition'>
              <div className=' flex flex-row items-center justify-between h-fit'>
                {resolvedLinks?.map((link) => {
                  return (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      link={link}
                      role={session?.user?.role}
                      className={link.className}
                    />
                  );
                })}
              </div>
            </div>
            {userInfo ? (
              <UserNavMenu user={userInfo} />
            ) : (
              <div className='flex gap-2'>
                <Button
                  variant='ghost'
                  type='button'
                  asChild
                  className='hidden h-fit  md:block  text-sm font-semibold py-1 px-2  hover:bg-neutral-100 hover:shadow-md  transition cursor-pointer bg-sky-500 group hover:!bg-sky-500/70'>
                  <Link
                    href='/login'
                    className=' flex flex-row gap-1 items-center justify-end '>
                    <span className='flex  gap-1 items-center justify-center font-semibold text-xs text-white group-hover:text-gray-600 group-hover:font-semibold'>
                      <LogInIcon
                        size={14}
                        className='text-white text-shadow group-hover:text-gray-600 group-hover:font-semibold svg'
                      />
                      <span className='text-shadow'>Masuk</span>
                    </span>
                  </Link>
                </Button>
                <Button
                  variant='ghost'
                  type='button'
                  asChild
                  className='hidden h-fit  md:block  text-sm font-semibold py-1 px-2  hover:bg-neutral-100 hover:shadow-md  transition cursor-pointer bg-sky-500 group hover:!bg-sky-500/70'>
                  <Link
                    href='/register'
                    className=' flex flex-row gap-1 items-center justify-end '>
                    <span className='flex  gap-1 items-center justify-center font-semibold text-xs text-white group-hover:text-gray-600 group-hover:font-semibold'>
                      <UserRoundPlus
                        size={14}
                        className='text-white text-shadow group-hover:text-gray-600 group-hover:font-semibold svg'
                      />
                      <span className='text-shadow'>Daftar</span>
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default TopNav;
