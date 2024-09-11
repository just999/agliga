import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  return session?.user.curUser;
};
export const useGetUserId = async () => {
  const session = await auth();

  return session?.user.id;
};

export const userRole = async () => {
  const session = await auth();
  if (!session) throw new Error('No session');

  return session?.user?.role;
};
