'use client';

import { fetchUserById, fetchUsers } from '@/lib/queries/users';
import useUserStore from '@/store/use-active-user-store';
import { UserProps } from '@/types';

import { useEffect } from 'react';

export const useGetUsers = (id?: string) => {
  const {
    user,
    users,
    loading,
    error,
    initializeUser,
    setUser,
    setUsers,
    toggleUserStatus,
    setUserStatus,
    setLoading,
    setError,
  } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (id) {
          const res: any = await fetchUserById(id);
          if (res) setUser(res);
        } else if (!id) {
          const res: any = await fetchUsers();
          if (res) setUsers(res);
        }
      } catch (err) {
        console.error('error fetch data', err);
        setError('error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setError, setUser, setUsers, setLoading]);
  return { loading, error, user, users, setLoading };
};
