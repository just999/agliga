import React from 'react';

import { getAuthUserId } from '@/actions/auth-actions';
import {
  getUserById,
  getUserByUserId,
  getUserInfoForNav,
} from '@/actions/user-actions';
import { auth } from '@/auth';
import ProfilePicture from '@/components/candidate-form/profile-picture';
import { Heading } from '@/components/shadcn/ui';
import ClientOnly from '@/lib/client-only';

import MemberProfile from './member-profile';

type ProfilePageProps = {};

const ProfilePage = async () => {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  const userId = await getAuthUserId();
  const user = await getUserByUserId(userId);
  return (
    <>
      <div className='flex flex-col bg-amber-50 pt-4 items-center rounded-lg max-w-[440px] mx-auto shadow-xl '>
        <Heading title='Profile' />

        <ProfilePicture user={userInfo} />
        {user ? (
          <MemberProfile user={user} />
        ) : (
          <div>Please login or Register</div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
