'use client';

import { getUnreadMessageCount } from '@/actions/message-actions';
import { useMessageStore } from '@/store/use-message-store';

import { useNotificationChannel } from '@/hooks/use-notification-channel';
import { usePresenceChannel } from '@/hooks/use-presence-channel';

import { useCallback, useEffect, useRef } from 'react';
import ToasterProvider from './toaster-provider';
// import { SessionProvider } from 'next-auth/react';
// import { Session } from 'next-auth';

type ProvidersProps = {
  userId: string | null;
  children: React.ReactNode;
  profileComplete: boolean;
};

const Providers = ({ children, userId, profileComplete }: ProvidersProps) => {
  const isUnreadCountSet = useRef(false);
  const { messages, updateUnreadCount } = useMessageStore((state) => ({
    messages: state.messages,
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => setUnreadCount(count));
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId, messages]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);

  return (
    <>
      <ToasterProvider />
      {children}
    </>
  );
};

export default Providers;
