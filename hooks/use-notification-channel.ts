'use client';

import { newMessageToast, newLikeToast } from '@/components/notification-toast';
import { pusherClient } from '@/lib/pusher';
import { useMessageStore } from '@/store/use-message-store';
import { MessageDto } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { Channel } from 'pusher-js';
import { useCallback, useEffect, useRef } from 'react';

import { useSession } from 'next-auth/react';

export const useNotificationChannel = (
  userId: string | null,
  profileComplete: boolean
) => {
  const channelRef = useRef<Channel | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  const { add, updateUnreadCount } = useMessageStore((state) => ({
    add: state.add,
    updateUnreadCount: state.updateUnreadCount,
  }));

  const role = session?.user.role;
  const pathnameRole =
    role === 'admin' ? '/dashboard/admin/messages' : '/dashboard/messages';

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      if (
        pathname === pathnameRole &&
        searchParams.get('container') !== 'outbox'
      ) {
        add(message);
        updateUnreadCount(1);
      } else if (pathname !== `/dashboard/chat/${message.senderId}`) {
        newMessageToast(message);
        updateUnreadCount(1);
      }
    },
    [add, pathname, pathnameRole, searchParams, updateUnreadCount]
  );

  const handleNewLike = useCallback(
    (data: { name: string; image: string | null; userId: string }) => {
      newLikeToast(data.name, data.image, data.userId);
    },
    []
  );

  useEffect(() => {
    if (!userId || !profileComplete) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);

      channelRef.current.bind('message:new', handleNewMessage);
      channelRef.current.bind('like:new', handleNewLike);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind('message:new', handleNewMessage);
        channelRef.current.unbind('like:new', handleNewLike);
        channelRef.current = null;
      }
    };
  }, [userId, handleNewMessage, profileComplete, handleNewLike]);
};
