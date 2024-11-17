import React from 'react';

import { getAdminUserId, getUserByUserId } from '@/actions/user-actions';
import { Card } from '@/components/shadcn/ui';
import { userRole } from '@/lib/auth';
import { cn } from '@/lib/utils';

import MemberSidebar from '../member-sidebar';

const UserLayout = async ({
  params,
  children,
}: {
  params: { userId: string };
  children: React.ReactNode;
}) => {
  // const session = await auth();
  // const userId = session?.user.id || null;

  const user = await getUserByUserId(params.userId);

  const role = await userRole();

  const admin = await getAdminUserId(params.userId);
  const basePath = `/members/${user?.id}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photo', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
    { name: 'DepoWd', href: `${basePath}/depoWd` },
  ];

  const adminUser = role === 'admin' ? user : admin;
  return (
    <div className='relative h-full w-full '>
      <div className='grid grid-cols-12 w-1/4 gap-0  absolute right-0 bottom-0'>
        <div className='col-span-3 bg-indigo-100 w-full'>
          {adminUser && (
            <MemberSidebar
              user={adminUser}
              navLinks={navLinks}
              className='fixed bottom-10  flex flex-col gap-2 items-center p-0  border border-solid border-stone-200 shadow-lg right-0  max-w-md z-50 transition-transform duration-300  rounded-t-lg'
            />
          )}
        </div>
        <div
          className={cn(
            'col-span-9 relative',
            basePath && 'mt-10 bottom-0 right-0 bg-emerald-100'
          )}
        >
          <Card>{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
