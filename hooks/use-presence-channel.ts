import { useCallback, useEffect, useRef } from 'react';

import { Channel, Members } from 'pusher-js';
import { pusherClient } from '@/lib/pusher';
import { usePresenceStore } from '@/store/use-presence-store';

export const usePresenceChannel = (
  userId: string | null,
  profileComplete: boolean
) => {
  const { set, add, remove } = usePresenceStore((state) => ({
    set: state.set,
    add: state.add,
    remove: state.remove,
  }));

  const channelRef = useRef<Channel | null>(null);

  const handleSetUsers = useCallback(
    (userIds: string[]) => {
      set(userIds);
    },
    [set]
  );

  const handleAddUser = useCallback(
    (userId: string) => {
      add(userId);
    },
    [add]
  );

  const handleRemoveUser = useCallback(
    (userId: string) => {
      remove(userId);
    },
    [remove]
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
        'pusher:user_added',
        (user: Record<string, any>) => {
          handleAddUser(user.id);
        }
      );

      channelRef.current.bind(
        'pusher:user_removed',
        (user: Record<string, any>) => {
          handleRemoveUser(user.id);
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
        channelRef.current.unbind('pusher:user_added', handleAddUser);
        channelRef.current.unbind('pusher:user_removed', handleRemoveUser);
      }
    };
  }, [
    handleAddUser,
    handleRemoveUser,
    handleSetUsers,
    profileComplete,
    userId,
  ]);
};
