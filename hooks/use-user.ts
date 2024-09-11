import { useSession } from 'next-auth/react';

export const useGetCurrentUserId = () => {
  const session = useSession();
  return session.data?.user.id;
};

export const useCurrentUserRole = () => {
  const session = useSession();
  return session.data?.user.role;
};

export const useGetCurrentAdminId = () => {
  const session = useSession();
  const adminId =
    session.data?.user.role === 'admin' ? session.data.user.id : '';

  return adminId;
};

export const useGetCurrentUser = () => {
  const session = useSession();
  return session.data?.user.curUser;
};
