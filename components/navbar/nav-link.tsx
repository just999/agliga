'use client';

import { cn } from '@/lib/utils';

import { useMessageStore } from '@/store/use-message-store';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { adminLinks } from '@/lib/helper';
import { useCallback, useEffect, useRef, useState } from 'react';
import useFormTypes from '@/hooks/use-form-types';
import ClientOnly from '@/lib/client-only';
import container from '../container';

type NavLinkProps = {
  href: string | ((container: string) => string);
  label: string;
  className?: string;
  role?: 'admin' | 'user';
  link: {
    label: string;
    href: string | ((container: string) => string);
    modal?: string;
    className: string;
  };
};

const NavLink = ({ href, label, className, link, role }: NavLinkProps) => {
  // const [modalLink, setModalLink] = useState<string>('');

  const isInitialMount = useRef(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));

  const isOutbox = searchParams.get('container') === 'outbox';

  const container = isOutbox ? 'outbox' : 'inbox';

  const { formType, setOn } = useFormTypes((state) => ({
    setOn: state.setOn,
    formType: state.formType,
  }));

  const baseLink = role === 'admin' ? '/dashboard/admin' : '/dashboard';

  const memoizedSetOn = useCallback(setOn, [setOn]);

  const handleToast = useCallback(() => {
    toast.success('Hello toast');
  }, []);

  // const handleFormType = useCallback(() => {
  //   if (pathname === `${baseLink}/posts`) {
  //     setOn('post');
  //   }
  //   if (pathname === `${baseLink}/sliders`) {
  //     setOn('add-slider');
  //   }

  //   if (pathname === `${baseLink}/deposit`) {
  //     setOn('depo');
  //   }

  //   if (pathname === `${baseLink}/wds`) {
  //     setOn('wd');
  //   }
  //   toast.success('Hello toast');
  // }, [setOn, formType, pathname]);
  useEffect(() => {
    const handleFormType = () => {
      if (pathname === `${baseLink}/posts`) {
        memoizedSetOn('post');
      } else if (pathname === `${baseLink}/sliders`) {
        memoizedSetOn('add-slider');
      } else if (pathname === `${baseLink}/deposit`) {
        memoizedSetOn('depo');
      } else if (pathname === `${baseLink}/wds`) {
        memoizedSetOn('wd');
      }
    };

    handleFormType();
  }, [pathname, baseLink, memoizedSetOn]);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     handleToast();
  //   }

  //   return () => handleToast();
  // }, []);
  const messageLink = `${baseLink}/messages`;

  const finalHref = typeof href === 'function' ? href(container) : href;

  // Update the isActive check
  const isActive = (
    currentPath: string,
    menuPath: string | ((arg: string) => string)
  ) => {
    let path = typeof menuPath === 'function' ? menuPath(container) : menuPath;

    if (path === '/dashboard') {
      return currentPath === path;
    }
    // Special case for messages
    if (path.startsWith(`${baseLink}/messages`)) {
      return currentPath.split('?')[0] === path.split('?')[0];
    }
    return currentPath.startsWith(path);
  };

  return (
    <ClientOnly>
      <Link
        // onClick={() => handleFormType()}
        href={finalHref}
        className={cn(
          'h-fit flex vertical-center',
          className,
          isActive(pathname, finalHref)
            ? ' text-lime-700  bg-emerald-50 drop-shadow-sm border-b-2 border-solid px-3 border-b-emerald-600 transition font-bold'
            : 'text-stone-400 bg-slate-100 px-3'
        )}>
        <span onClick={handleToast}>{label}</span>
        {finalHref.startsWith(messageLink) && unreadCount > 0 && (
          <span className='ml-1 text-emerald-400 font-bold'>
            ({unreadCount})
          </span>
        )}
      </Link>
    </ClientOnly>
  );
};

export default NavLink;
