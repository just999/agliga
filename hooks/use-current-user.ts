'use client';

import getCurrentUser from '@/actions/get-user';

import { auth } from '@/auth'; // Assuming this imports your NextAuth.js session provider
import { db } from '@/lib/db'; // Assuming this imports your Prisma client

// import useUsersStore, { UserProps } from '@/store/use-user-store';

import { User } from 'next-auth';
import error from 'next/error';

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
        const res = await getCurrentUser();
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
