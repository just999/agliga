import ProfilePicture from '@/components/candidate-form/profile-picture';
import MemberProfile from './member-profile';
import { auth } from '@/auth';

import ClientOnly from '@/lib/client-only';
import { Heading } from '@/components/ui';
import { getAuthUserId } from '@/actions/auth-actions';

import { getUserById, getUserByUserId } from '@/actions/user-actions';

type ProfilePageProps = {};

const ProfilePage = async () => {
  const userId = await getAuthUserId();
  const user = await getUserByUserId(userId);
  return (
    <>
      <div className='flex flex-col bg-amber-50 pt-4 items-center rounded-lg max-w-[440px] mx-auto shadow-xl '>
        <Heading title='Profile' />

        <ProfilePicture />
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
