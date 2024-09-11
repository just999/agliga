'use client';

import getCurrentUser from '@/actions/get-user';
import { getUserById } from '@/actions/user-actions';

import { User } from '@prisma/client';

import { useEffect, useState } from 'react';

// Enhanced type for clarity and potential email verification field
type CurrentUserProps = {
  user: User | undefined;
};

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const res = (await getCurrentUser()) as any;
        if (!res) throw new Error('Failed to fetch user');
        setCurrentUser(currentUser);
      } catch (err: any) {
        console.error('error fetching data', err);
        setError('Failed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [currentUser]);

  return { error, currentUser, isLoading };
};

export default useCurrentUser;

export const useUserByUserId = (userId: string) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await getUserById(userId);
        if (!res) throw new Error('Failed to fetch user');
        setUser(res);
      } catch (err: any) {
        console.error('error fetching data', err);
        setError('Failed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setIsLoading, setError]);

  return { error, user, isLoading };
};
