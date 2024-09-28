'use client';

import { getUnreadMessageCount } from '@/actions/message-actions';
import { useMessageStore } from '@/store/use-message-store';

import { useNotificationChannel } from '@/hooks/use-notification-channel';
import { usePresenceChannel } from '@/hooks/use-presence-channel';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCallback, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider />
      {children}
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition={'top-right'}
        />
      )}
    </QueryClientProvider>
  );
};

export default Providers;
