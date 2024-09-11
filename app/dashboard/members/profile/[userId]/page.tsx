import { getUserByUserId } from '@/actions/user-actions';

import EditProfileForm from './edit-profile-form';

import { notFound } from 'next/navigation';
import { getAuthUserId } from '@/actions/auth-actions';

type EditProfilePageProps = {};

const EditProfilePage = async () => {
  const userId = await getAuthUserId();

  const user = await getUserByUserId(userId);
  if (!user) return notFound();

  return <>{user && <EditProfileForm user={user} />}</>;
};

export default EditProfilePage;
