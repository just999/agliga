'use client';

import { getUnreadMessageCount } from '@/actions/message-actions';
import { useMessageStore } from '@/store/use-message-store';

import { getAnonymousUser } from '@/actions/live-chat-actions';
import { useNotificationChannel } from '@/hooks/use-notification-channel';
import { usePresenceChannel } from '@/hooks/use-presence-channel';
import { useChatStore } from '@/store/use-chat-store';
import { User } from '@prisma/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ToasterProvider from './toaster-provider';

type ProvidersProps = {
  userId: string | null;
  children: React.ReactNode;
  profileComplete: boolean;
};

const Providers = ({ children, userId, profileComplete }: ProvidersProps) => {
  const [anonymousUser, setAnonymousUser] = useState<User>();
  const isUnreadCountSet = useRef(false);
  // const anonymousUserRef = useRef<User | null>(null);
  const { messages, updateUnreadCount } = useMessageStore((state) => ({
    messages: state.messages,
    updateUnreadCount: state.updateUnreadCount,
  }));
  const { data: session, status } = useSession();

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
  }, [setUnreadCount, userId]);

  const {
    anoId,
    chatId,
    setChatId,
    setAnoId,
    setTab,
    toggleStartChat,
    setToggleStartChat,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    anoId: state.anoId,
    chatId: state.chatId,
    setChatId: state.setChatId,
    setAnoId: state.setAnoId,
    setTab: state.setTab,
    isToggle: state.isToggle,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  useEffect(() => {
    const checkAnonymousUser = async () => {
      if (status === 'unauthenticated' && typeof window !== 'undefined') {
        const storedSessionId = sessionStorage.getItem('anonymousId');
        console.log('Retrieved anonymousId:', storedSessionId);
        if (storedSessionId) {
          try {
            const existingUser = await getAnonymousUser(storedSessionId);
            console.log('Fetched user:', existingUser);
            if (existingUser.status === 'success' && existingUser.data) {
              setAnonymousUser(existingUser.data);
              setAnoId(existingUser.data.id);
            } else {
              console.log('No valid user data found');
              sessionStorage.removeItem('anonymousId');
            }
          } catch (error) {
            console.error('Error fetching anonymous user:', error);
            sessionStorage.removeItem('anonymousId');
          }
        }
      }
    };

    checkAnonymousUser();
  }, [status, setAnoId]);
  // *CHATGPT SUGGESTIONS TO IMPLEMENT THIS CODE USING REF
  // useEffect(() => {
  //   const checkAnonymousUser = async () => {
  //     if (status === 'unauthenticated' && typeof window !== 'undefined') {
  //       const storedSessionId = sessionStorage.getItem('anonymousId');
  //       if (storedSessionId) {
  //         try {
  //           const existingUser = await getAnonymousUser(storedSessionId);
  //           if (existingUser.status === 'success' && existingUser.data) {
  //             anonymousUserRef.current = existingUser.data;
  //             // You can still use setAnonymousUser if you need to trigger a re-render
  //             // setAnonymousUser(existingUser.data);
  //           } else {
  //             console.log('No valid user data found');
  //             sessionStorage.removeItem('anonymousId');
  //           }
  //         } catch (error) {
  //           console.error('Error fetching anonymous user:', error);
  //           sessionStorage.removeItem('anonymousId');
  //         }
  //       }
  //     }
  //   };

  //   checkAnonymousUser();
  // }, [status]);

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => setUnreadCount(count));
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);
  const newProfile = status === 'authenticated' ? profileComplete : true;

  const newUserId = status === 'authenticated' ? userId : anoId;
  useEffect(() => {
    // console.log('Current anonymousUser:', anonymousUser);
    // console.log('Current id:', userId);
  }, [anonymousUser, userId]);
  usePresenceChannel(newUserId, newProfile);
  useNotificationChannel(newUserId, newProfile);

  const queryClient = new QueryClient();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // if (status === 'unauthenticated' && !anonymousUser) {
  //   return <div>Fetching anonymous user...</div>;
  // }
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PortalProvider> */}
      <ToasterProvider />
      {children}
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition={'top-right'}
        />
      )}
      {/* </PortalProvider> */}
    </QueryClientProvider>
  );
};

export default Providers;
