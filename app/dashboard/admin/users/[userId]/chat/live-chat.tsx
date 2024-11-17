'use client';

import { useCallback, useEffect } from 'react';

import LiveChatContainer from '@/components/chat/live-chat-container';
import { Button } from '@/components/shadcn/ui';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { SafeAdminChat } from '@/types/types';
import { User } from '@prisma/client';
import { ChevronDownSquareIcon, MessageCircleMore } from 'lucide-react';
import { useSession } from 'next-auth/react';

type LiveChatProps = { users: User[]; adminProfile: SafeAdminChat };

const LiveChat = ({ users, adminProfile }: LiveChatProps) => {
  const userRole = useSession().data?.user.role;
  const status = useSession().status;
  const { usersId } = usePresenceStore((state) => ({
    usersId: state.usersId,
  }));

  const {
    tab,
    chatId,
    setChatId,
    setTab,
    toggleStartChat,
    toggleSidePanel,
    setToggleStartChat,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    tab: state.tab,
    setTab: state.setTab,
    chatId: state.chatId,
    setChatId: state.setChatId,
    isToggle: state.isToggle,
    toggleSidePanel: state.toggleSidePanel,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  const handleToggleOffChat = useCallback(() => {
    setIsToggle(false);
    setShowBubbleChat(true);
  }, [setIsToggle, setShowBubbleChat]);

  const handleToggleChat = useCallback(() => {
    setIsToggle(true);
    setShowBubbleChat(false);
    setToggleStartChat(true);
    console.log('toggle chat');
  }, [setIsToggle, setShowBubbleChat, setToggleStartChat]);

  useEffect(() => {
    if (isToggle) {
      setShowBubbleChat(false);
    }
  }, [isToggle, setShowBubbleChat]);
  return (
    <div className='w-full'>
      {isToggle && (
        <Button
          onClick={handleToggleChat}
          type='button'
          variant='ghost'
          size='sm'
          className={cn(
            'group h-full flex gap-2 items-center text-wrap text-white font-extrabold text-shadow text-sm bg-sky-500 hover:bg-blue-500/90 py-1',
            isToggle && ''
          )}
        >
          <ChevronDownSquareIcon
            size={24}
            className='svg text-white group-hover:text-gray-700'
          />
          <span className='text-white group-hover:text-gray-700'>Close</span>
        </Button>
      )}
      <div
        className={cn(
          `fixed bottom-4 right-1 text-shadow-lg transition-transform duration-300 ease-in-out transform`,
          isToggle ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* <NewChatContainer users={users} adminProfile={adminProfile} /> */}
        <LiveChatContainer users={users} adminProfile={adminProfile} />

        {/* <LiveChat users={users} adminProfile={adminProfile} /> */}
      </div>
      <input />

      {!isToggle && showBubbleChat && userRole === 'user' ? (
        <Button
          aria-label='chat widget'
          disabled={loading}
          variant='ghost'
          className={cn(
            'fixed bottom-60 p-0 m-0 w-13 h-13 hover:bg-transparent z-20',
            loading && 'cursor-not-allowed'
          )}
          onClick={handleToggleChat}
        >
          <MessageCircleMore
            size={50}
            className='svg text-blue-600 hover:text-shadow hover:text-500/80 hover:fill-slate-500/20 hover:text-blue-700'
          />
        </Button>
      ) : null}
    </div>
  );
};

export default LiveChat;
