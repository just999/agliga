'use client';

import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { SafeAdminChat } from '@/types/types';
import { ChevronDownSquareIcon } from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui';
import LiveChat from './live-chat';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { getAnonymousUser } from '@/actions/live-chat-actions';

type LiveChatContainerProps = {
  users: User[];
  adminProfile: SafeAdminChat;
};

const LiveChatContainer = ({ users, adminProfile }: LiveChatContainerProps) => {
  const [anonymousUser, setAnonymousUser] = useState<User>();

  const { data: session, status } = useSession();
  const {
    tab,
    setChatId,
    setTab,
    loading,
    setLoading,
    toggleStartChat,
    setToggleStartChat,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    setChatId: state.setChatId,
    setTab: state.setTab,
    tab: state.tab,
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    toggleSidePanel: state.toggleSidePanel,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));
  const handleToggleOffChat = useCallback(() => {
    setIsToggle(false);
    setToggleStartChat(false);
    setShowBubbleChat(true);
  }, [setIsToggle, setShowBubbleChat, setToggleStartChat]);

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
  }, [status]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem('anonymousId');

      if (!sessionId) return;

      const filteredAnonymousUser =
        users && users.filter((user) => user.nonUserSessionId === sessionId)[0];

      if (filteredAnonymousUser) setAnonymousUser(filteredAnonymousUser);
    }
  }, [setAnonymousUser, users]);
  return (
    <>
      {/* {isToggle && (
        <Button
          onClick={handleToggleOffChat}
          type='button'
          variant='ghost'
          size='sm'
          className={cn(
            'group h-full flex gap-2 items-center text-wrap text-white font-extrabold text-shadow text-sm bg-sky-500 hover:bg-blue-500/90 py-1',
            isToggle && ''
          )}>
          <ChevronDownSquareIcon
            size={24}
            className='svg text-white group-hover:text-gray-700'
          />
          <span className='text-white group-hover:text-gray-700'>Close</span>
        </Button>
      )} */}

      <LiveChat users={users} adminProfile={adminProfile} />
    </>
  );
};

export default LiveChatContainer;
