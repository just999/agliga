import React from 'react';

import {
  fetchUsers,
  getAdminUserId,
  getUserByUserId,
} from '@/actions/user-actions';
import NewChatWidget from '@/components/chat/new-chat-widget';
import { Card } from '@/components/shadcn/ui';
import { userRole } from '@/lib/auth';
import { adminChatProfile } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

import ChatSidebar from '../chat-sidebar';
import MemberSidebar from '../member-sidebar';

interface PortalRoot {
  root: HTMLElement | null;
}

const UserLayout = async ({
  params,
  children,
  root,
}: {
  params: { userId: string };
  children: React.ReactNode;
  root: PortalRoot;
}) => {
  // const session = await auth();
  // const userId = session?.user.id || null;

  const user = await getUserByUserId(params.userId);
  const users = await fetchUsers(); //?fetch users only no admin
  const role = await userRole();
  // const admin = adminChatProfile;
  const admin = await getAdminUserId(params.userId);
  const adminArray = admin && Array(admin);

  const basePath = `/dashboard/admin/users/${user?.id}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photo', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
    { name: 'DepoWd', href: `${basePath}/depoWd` },
  ];

  const adminUser = role === 'admin' ? users : adminArray;

  return (
    <div className='fixed grid grid-cols-24 w-96 h-[570px] gap-0 right-0 bottom-4 z-10'>
      <div className='flex flex-col gap-1 col-span-2 bg-indigo-100 w-8'>
        {role === 'admin' &&
          adminUser?.map((user) => (
            <ChatSidebar
              key={user.id}
              user={user}
              navLinks={navLinks}
              className='bottom-10 text-[10px] flex flex-col gap-2 items-center p-0  border border-solid border-stone-200 shadow-lg right-0  transition-transform duration-300  rounded-t-lg'
            />
          ))}
      </div>
      <div
        className={cn(
          'col-span-22 w-[352px] bg-slate-300'
          // basePath && 'bg-emerald-100'
        )}
      >
        <Card>{children}</Card>
      </div>
    </div>
  );
};

export default UserLayout;
