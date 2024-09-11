'use client';

import { getUnreadMessagesBySenderId } from '@/actions/message-actions';
import { useState, useEffect, useCallback } from 'react';
import PresenceAvatar from '../presence-avatar';
import { cn, createChatId } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

type ChatSidebarProps = {
  userId: string;
  src: string | null;
  active?: boolean;
  recipient?: User | null;
  userData?: User | null;
};

const ChatSidebar = ({
  userId,
  src,
  recipient,
  userData,
}: ChatSidebarProps) => {
  const [count, setCount] = useState<number>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnreadMessagesBySenderId(userId);
      const { unreadMessCount } = res;
      setCount(unreadMessCount);
    };

    fetchData();
  }, [setCount, count, userId]);
  const {
    isToggle,
    setIsToggle,
    setChatId,
    setSenderId,
    recipientId,
    setRecipientId,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    setSenderId: state.setSenderId,
    setChatId: state.setChatId,
    setRecipientId: state.setRecipientId,
    recipientId: state.recipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const recId = recipient?.id || '';

  // useEffect(() => {
  //   if (currentUserId) setSenderId(currentUserId);
  //   if (recId) setRecipientId(recId);
  // }, []);

  const chatId = createChatId(currentUserId, userId);
  const handleToggleChat = useCallback(() => {
    if (currentUserId) setSenderId(currentUserId);
    if (userId) setRecipientId(userId);
    if (chatId) setChatId(chatId);

    setIsToggle(true);
    setShowBubbleChat(false);
    setTimeout(() => {
      setShowBubbleChat(false);
    }, 500);
  }, [
    setIsToggle,
    setShowBubbleChat,
    setSenderId,
    setRecipientId,
    setChatId,
    chatId,
    currentUserId,
    userId,
  ]);

  return (
    <li
      className={cn(
        'relative cursor-pointer flex items-center p-1',
        recipientId === userId && 'bg-amber-300 rounded-l-md'
        // active && 'bg-amber-300 rounded-l-md'
      )}
      onClick={handleToggleChat}>
      <PresenceAvatar userId={userId} src={src} className='h-8 w-8' />

      <span className='absolute bg-rose-500 -top-1 left-0 rounded-full p-0 text-[10px]  font-semibold px-1.5 align-middle text-center z-9999 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150  text-white text-shadow pt-[2px]'>
        {count}
      </span>
    </li>
  );
};

export default ChatSidebar;
