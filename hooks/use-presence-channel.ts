import { useCallback, useEffect, useRef } from 'react';

import { Channel, Members } from 'pusher-js';
import { pusherClient } from '@/lib/pusher';
import { usePresenceStore } from '@/store/use-presence-store';
import { User } from '@prisma/client';

export const usePresenceChannel = (
  userId: string | null,
  profileComplete: boolean
) => {
  const { set, add, addUsers, setUsers, remove, removeUser } = usePresenceStore(
    (state) => ({
      set: state.set,
      setUsers: state.setUsers,
      add: state.add,
      addUsers: state.addUsers,
      remove: state.remove,
      removeUser: state.removeUser,
    })
  );

  const channelRef = useRef<Channel | null>(null);

  const handleSetUsers = useCallback(
    (userIds: string[]) => {
      set(userIds);
    },
    [set]
  );
  const handleSetUsersDetails = useCallback(
    (users: User[]) => {
      setUsers(users as User[]);
    },
    [setUsers]
  );

  const handleAddUser = useCallback(
    (userId: string) => {
      add(userId);
    },
    [add]
  );

  const handleAddUserDetails = useCallback(
    (user: User) => {
      addUsers(user);
    },
    [addUsers]
  );
  const handleRemoveUser = useCallback(
    (userId: string) => {
      remove(userId);
    },
    [remove]
  );
  const handleRemoveUserDetails = useCallback(
    (userId: string) => {
      removeUser(userId);
    },
    [removeUser]
  );

  useEffect(() => {
    if (!userId || !profileComplete) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe('presence-nm');

      channelRef.current.bind(
        'pusher:subscription_succeeded',
        (users: Members) => {
          handleSetUsers(Object.keys(users.members));
        }
      );

      channelRef.current.bind(
        'pusher:subscription_set_succeeded',
        (users: Members) => {
          handleSetUsersDetails(users.members);
        }
      );

      channelRef.current.bind(
        'pusher:user_added',
        (user: Record<string, any>) => {
          handleAddUser(user.id);
        }
      );
      channelRef.current.bind('pusher:user_details_added', (users: User) => {
        handleAddUserDetails(users);
      });
      channelRef.current.bind(
        'pusher:user_removed',
        (user: Record<string, any>) => {
          handleRemoveUser(user.id);
        }
      );
      channelRef.current.bind(
        'pusher:user_details_removed',
        (user: Record<string, any>) => {
          handleRemoveUserDetails(user.id);
        }
      );
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          'pusher:subscription_succeeded',
          handleSetUsers
        );
        channelRef.current.unbind(
          'pusher:subscription_set_succeeded',
          handleSetUsers
        );
        channelRef.current.unbind('pusher:user_added', handleAddUser);
        channelRef.current.unbind('pusher:user_details_added', handleAddUser);
        channelRef.current.unbind('pusher:user_removed', handleRemoveUser);
        channelRef.current.unbind(
          'pusher:user_details_removed',
          handleRemoveUser
        );
      }
    };
  }, [
    handleAddUser,
    handleRemoveUser,
    handleSetUsers,
    handleAddUserDetails,
    handleRemoveUserDetails,
    handleSetUsersDetails,
    profileComplete,
    userId,
  ]);
};
