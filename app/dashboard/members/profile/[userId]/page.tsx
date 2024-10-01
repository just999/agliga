import { getUserByUserId, getUserInfoForNav } from '@/actions/user-actions';
import React from 'react';
import EditProfileForm from './edit-profile-form';

import { notFound } from 'next/navigation';
import { getAuthUserId } from '@/actions/auth-actions';
import { auth } from '@/auth';

type EditProfilePageProps = {};

const EditProfilePage = async () => {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());
  const userId = await getAuthUserId();

  const user = await getUserByUserId(userId);
  if (!user) return notFound();

  return <>{user && <EditProfileForm user={user} userInfo={userInfo} />}</>;
};

export default EditProfilePage;
