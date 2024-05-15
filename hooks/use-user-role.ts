import { useSession } from 'next-auth/react';

export const useUserRole = () => {
  const { data } = useSession();

  return data?.user.curUser.role;
};
