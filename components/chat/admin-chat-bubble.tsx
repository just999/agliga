'use client';

import { cn, createChatId } from '@/lib/utils';

import { User } from '@prisma/client';

import { LucideMessagesSquare, MessageCircleMore } from 'lucide-react';
import { usePresenceStore } from '@/store/use-presence-store';

import { useMessageStore } from '@/store/use-message-store';
import { useCallback, useEffect, useState } from 'react';

import { Button, Spinner } from '../ui';

import { useSession } from 'next-auth/react';
import { useChatStore } from '@/store/use-chat-store';

import { useCurrentUserRole } from '@/hooks/use-user';

import ChatContainer from './chat-container';

import { MessageDto } from '@/types';
import { getMessageThread } from '@/actions/message-actions';

type AdminChatBubbleProps = {
  adminUser?: User;
  senderId?: string;
  className?: string;
  users: User[] | [];
  adminProfile?: User | null;
};

type MessagesProps = {
  messages: MessageDto[];
  readCount: number;
};

const AdminChatBubble = ({
  // adminUser,
  // senderId,
  className,
  adminProfile,
  users,
}: AdminChatBubbleProps) => {
  const [messages, setMessages] = useState<MessagesProps>();

  const [recipientMessage, setRecipientMessage] = useState<string | ''>('');

  // const [recipientUserData, setRecipientUserData] = useState<User[]>();

  const { data: session } = useSession();
  const user = session?.user.curUser;
  const curUserId = session?.user.id;
  const adminId = adminProfile?.id || '';
  const role = useCurrentUserRole();
  const { usersId } = usePresenceStore((state) => ({
    usersId: state.usersId,
  }));
  const rc =
    role === 'user'
      ? adminId
      : usersId && usersId.filter((userId) => userId !== curUserId)[0];
  // const rc = usersId && usersId.filter((userId) => userId !== curUserId)[0];
  const recipientAdminUser =
    role === 'admin'
      ? users.filter(
          (user) =>
            // usersId.includes(user.id) && user !== null && user !== undefined
            user.role !== 'admin'
        )
      : [adminProfile].filter((user) => user !== null && user !== undefined);
  const rec =
    role === 'user'
      ? adminProfile
      : users && users.filter((user) => user.id === rc)[0];
  // const rec = users && users.filter((user) => user.id === rc)[0];

  const {
    senderId,
    recipientId,
    chatId,
    setChatId,
    isToggle,
    setIsToggle,
    setSenderId,
    setRecipientId,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    senderId: state.senderId,
    chatId: state.chatId,
    setChatId: state.setChatId,
    recipientId: state.recipientId,
    setSenderId: state.setSenderId,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));
  useEffect(() => {
    if (!recipientId) return;
    const fetchMessages = async () => {
      try {
        const res = await getMessageThread(recipientId);
        if (res) setMessages(res);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [rc, setMessages, recipientId]);

  const r = (users && users.filter((user) => user.id === recipientId)[0]) || [];

  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));
  useEffect(() => {
    if (role === 'user' && adminId) {
      setRecipientId(adminId);
      setSenderId(curUserId);
    }

    // if (role === 'user' && adminProfile) setRecipientUserData(adminProfile);
    if (role === 'user' && adminId) setRecipientMessage(adminId);
    // if (role === 'admin' && recipientAdminUser)
    //   setRecipientUserData(recipientAdminUser);
  }, [
    setRecipientMessage,
    // setRecipientUserData,
    recipientId,
    rec,
    curUserId,
    setRecipientId,
    setSenderId,
    adminId,
    role,
    adminProfile,
  ]);

  // const chatId = createChatId(curUserId, r.id);

  const handleToggleChat = useCallback(() => {
    setIsToggle(true);
    setShowBubbleChat(false);

    // if (chatId) setChId(chatId);

    setTimeout(() => {
      setShowBubbleChat(false);
    }, 500);
  }, [setIsToggle, setShowBubbleChat]);

  const renderedButton = (
    <Button
      variant='ghost'
      // disabled={role === 'admin'}
      onClick={handleToggleChat}
      className={cn(
        'bottom-0 p-0 m-0 z-9999 text-right bg-indigo-500',
        // !recipientUserData?.id && 'cursor-not-allowed',
        // showBubbleChat ? 'slide-up' : 'slide-down',
        className
      )}>
      {/* {Array.isArray(recipientAdminUser) &&
        recipientAdminUser?.length !== 0 && ( */}
      <div>
        <MessageCircleMore
          size={48}
          className={cn(
            'svg fixed animate-bounce cursor-pointer text-emerald-500  bottom-4 right-14  transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150'
            // admin.role === 'admin' && 'fill-cyan-100'
          )}
        />
        <span className='fixed animate-bounce bg-orange-500 bottom-10 right-14 rounded-full p-0 text-xs font-semibold px-1 text-right z-9999 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150  text-white text-shadow'>
          {unreadCount}
        </span>
      </div>
      {/* )} */}
    </Button>
  );

  const renderedBubbleChat = isToggle ? (
    <ChatContainer
      avatar={r?.image}
      initialMessages={messages}
      username={r?.name}
      // chatId={chatId}
      userId={curUserId}
      rUser={r}
      users={users}
      recipient={r}
    />
  ) : showBubbleChat ? (
    renderedButton
  ) : (
    ''
  );

  return renderedBubbleChat;
};

export default AdminChatBubble;
