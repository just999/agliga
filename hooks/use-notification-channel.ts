'use client';

import { useCallback, useEffect, useRef } from 'react';
import { newMessageToast, newLikeToast } from '@/components/notification-toast';
import { pusherClient } from '@/lib/pusher';
import { useMessageStore } from '@/store/use-message-store';
import { MessageDto } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { Channel } from 'pusher-js';

import { useSession } from 'next-auth/react';
import { useChatStore } from '@/store/use-chat-store';

export const useNotificationChannel = (
  userId: string | null,
  profileComplete: boolean
) => {
  const channelRef = useRef<Channel | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();

  const { add, updateUnreadCount } = useMessageStore((state) => ({
    add: state.add,
    updateUnreadCount: state.updateUnreadCount,
  }));

  const isOutbox = searchParams?.get('container') === 'outbox';

  const container = isOutbox ? 'outbox' : 'inbox';

  const role = session?.user.role;
  const pathnameRole =
    role === 'admin' ? '/dashboard/admin/messages' : '/dashboard/messages';

  const {
    setChatId,
    tab,
    setTab,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    setChatId: state.setChatId,
    tab: state.tab,
    setTab: state.setTab,
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      if (
        pathname === pathnameRole &&
        searchParams?.get('container') !== 'outbox'
      ) {
        add(message);
        updateUnreadCount(1);
      }
      //  else if (pathname !== `/dashboard/chat/${message.senderId}`)
      else if (tab !== message.senderId) {
        newMessageToast(message);
        updateUnreadCount(1);
      }
    },
    [add, pathname, pathnameRole, searchParams, tab, updateUnreadCount]
  );

  const handleNewLike = useCallback(
    (data: {
      name: string;
      image: string | null;
      userId: string;
      message: MessageDto;
    }) => {
      newLikeToast(data.name, data.image, data.userId, data.message);
    },
    []
  );

  useEffect(() => {
    if (!userId || !profileComplete) return;
    if (!channelRef.current) {
      channelRef.current =
        status === 'authenticated'
          ? pusherClient.subscribe(`private-${userId}`)
          : pusherClient.subscribe(`private-anonymous-${userId}`);

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
