import { useSession } from 'next-auth/react';

export const useUserRole = () => {
  const { data } = useSession();

  const role = data?.user.curUser.role;

  return role;
};
