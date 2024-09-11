'use client';

import useModal from '@/hooks/use-modal';
import { cn } from '@/lib/utils';

import { useMessageStore } from '@/store/use-message-store';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { adminLinks } from '@/lib/helper';
import { useEffect, useState } from 'react';

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
  const [modalLink, setModalLink] = useState<string>('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));

  const isOutbox = searchParams.get('container') === 'outbox';

  const container = isOutbox ? 'outbox' : 'inbox';
  const handleToast = () => {
    toast.success('Hello toast');
  };
  const { modalType, onOpen } = useModal();

  const open = [
    '/dashboard/admin/posts',
    '/dashboard/admin/topics',
    '/add-schedule',
    '/deposit',
    '/wd',
    '/sliders',
  ];

  // const openModal = adminLinks.filter((item) => open.includes(item.href));
  useEffect(() => {
    if (link.modal !== undefined && link.modal !== '') {
      setModalLink(link.modal);
    }
  }, [link.modal]);

  // const handleOpenModal = () => {
  //   if (href === '/dashboard/admin/posts') onOpen('post');
  //   if (href === '/dashboard/admin/topics') onOpen('topic');
  //   if (href === '/dashboard/admin/schedules') onOpen('add-schedule');
  //   if (href === '/dashboard/admin/sliders') onOpen('add-slider');
  //   if (href === '/dashboard/admin/deposits') onOpen('depo');
  //   if (href === '/dashboard/admin/wds') onOpen('wd');
  // };

  const messageLink =
    role === 'admin' ? '/dashboard/admin/messages' : '/dashboard/messages';

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
    if (
      path.startsWith('/dashboard/messages') ||
      path.startsWith('/dashboard/admin/messages')
    ) {
      return currentPath.split('?')[0] === path.split('?')[0];
    }
    return currentPath.startsWith(path);
  };

  return (
    <Link
      // onClick={handleOpenModal}
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
        <span className='ml-1 text-emerald-400 font-bold'>({unreadCount})</span>
      )}
    </Link>
  );
};

export default NavLink;
