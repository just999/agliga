'use client';

import {
  capitalizeFirstCharacter,
  cn,
  createChatId,
  formatShortDateTime,
  formattedDateMonthDate,
  normalizedDateTime,
} from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';

import { MessageCircleMore } from 'lucide-react';
import { BsChevronDown } from 'react-icons/bs';
import PresenceAvatar from '../presence-avatar';
import { Button, Spinner } from '@/components/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageDto } from '@/types';
import { User } from '@prisma/client';
import MessageList from './message-list';
import ChatForm from './chat-form';
import { getMessageThread } from '@/actions/message-actions';

import { useCurrentUserRole } from '@/hooks/use-user';
import ChatSidebar from './chat-sidebar';
import CardInnerWrapper from '../card-inner-wrapper';
import { useSession } from 'next-auth/react';

type ChatContainerProps = {
  username: string | null | undefined;
  avatar: string | null | undefined;
  chatId?: string;
  userId: string;
  initialMessages?: { messages: MessageDto[]; readCount: number };
  rUser?: User | null;
  users?: User[];
  recipient?: User | null;
};
export type MessagesProps = {
  messages: MessageDto[];
  readCount: number;
};

const ChatContainer = ({
  username,
  avatar,
  // chatId,
  userId,
  rUser,
  users,
  recipient,
  initialMessages,
}: // messages,
ChatContainerProps) => {
  const [messages, setMessages] = useState<MessagesProps | null>(null);
  // const [showBubbleChat, setShowBubbleChat] = useState<boolean>(true);
  // const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const {
    senderId,
    recipientId,
    setSenderId,
    setRecipientId,
    // chatId,
    setChatId,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setToggleSidePanel,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    senderId: state.senderId,
    recipientId: state.recipientId,
    setSenderId: state.setSenderId,
    // chatId: state.chatId,
    setChatId: state.setChatId,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
    showBubbleChat: state.showBubbleChat,
  }));
  const role = useCurrentUserRole();

  // const fetchMessages = useCallback(async () => {
  //   if (!recipientId) return;
  //   const fetchData = async () => {
  //     try {
  //       const res = await getMessageThread(recipientId);
  //       if (res) setMessages(res);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };
  //   fetchData();
  // }, [recipientId, setMessages]);

  // useEffect(() => {
  //   fetchMessages();
  // }, [recipientId, setMessages, fetchMessages]);

  useEffect(() => {
    if (!rUser?.id) return;
    const fetchData = async () => {
      try {
        const res = await getMessageThread(rUser.id);
        if (res) setMessages(res);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, [rUser?.id, recipientId]);

  const currentUserId = session?.user.id;

  const chatId =
    currentUserId && rUser?.id && createChatId(currentUserId, rUser?.id);

  const handleToggleOff = useCallback(() => {
    if (session?.user.id) setSenderId(session?.user.id);
    if (recipient?.id) setRecipientId(recipient.id);

    if (chatId) setChatId(chatId);

    setIsToggle(false);
    setShowBubbleChat(true); // Hide the BubbleChat immediately

    // Show BubbleChat after 500 milliseconds
    setTimeout(() => {
      setShowBubbleChat(true);
    }, 500);
  }, [
    setIsToggle,
    setShowBubbleChat,
    chatId,
    recipient?.id,
    session?.user.id,
    setChatId,
    setRecipientId,
    setSenderId,
  ]);

  const normalizedMessageDateTime = messages?.messages.map(
    (mes) => new Date(normalizedDateTime(mes.created))
  );
  const latestMessageDate =
    normalizedMessageDateTime?.reduce((latest, current) => {
      return new Date(current) > new Date(latest) ? current : latest;
    }, new Date()) || new Date();

  // if (!latestMessageDate) return null;
  const formattedMessageDate = formatShortDateTime(latestMessageDate);
  const formatMessDate = formattedDateMonthDate(formattedMessageDate);

  if (!messages) return [];
  // if (!chatId) return null;

  const recipientData =
    users && users.filter((user) => user.id === rUser?.id)[0];

  const renderedSidePanel =
    users &&
    users.map((userData) => (
      <ChatSidebar
        key={userData.id}
        userId={userData.id}
        src={userData.image}
        userData={userData}
        recipient={recipient}
      />
    ));

  const renderedHeader = (
    <span className='flex flex-row justify-between w-full items-center p-0 h-10'>
      {/* {recipientData?.name && ( */}
      <span className='text-sky-400 flex gap-2 items-center justify-center h-10'>
        <PresenceAvatar src={avatar} className='min-w-[20px] h-auto' />
        {username && capitalizeFirstCharacter(username)}
      </span>
      {/* )} */}
      <span className='flex items-center gap-2 '>
        {' '}
        <MessageCircleMore size={18} className='svg text-blue-500' />{' '}
        <span className='text-shadow font-semibold text-blue-500'>Chat</span>
      </span>
      <Button
        // variant='ghost'
        aria-label='member chat'
        size='sm'
        type='button'
        className='p-0 m-0 h-0 hover:bg-emerald-100 hover:text-sky-700 pr-1'
        onClick={handleToggleOff}>
        {/* <Link href={`/members/${user.id}`}> */}
        <BsChevronDown className='fill-gray-800' />
        {/* </Link> */}
      </Button>
    </span>
  );

  const footerContent = rUser ? (
    <ChatForm recipientData={rUser} />
  ) : (
    <Spinner />
  );
  const sidePanel = role === 'admin' ? renderedSidePanel : '';

  const messageListContent = chatId && (
    <MessageList
      initialMessages={messages}
      currentUserId={userId}
      chatId={chatId}
      user={session.user.curUser}
    />
  );

  return (
    <div
      className={cn(
        'p-0 bottom-0  right-0 max-w-md z-50 transition-transform duration-300 items-end rounded-t-lg ',
        isToggle ? 'slide-down' : 'slide-up',
        toggleSidePanel
          ? ' shadow-lg'
          : ' border-l-transparent border-t-transparent shadow-none'
      )}>
      <CardInnerWrapper
        toggleSidePanel={toggleSidePanel}
        setToggleSidePanel={setToggleSidePanel}
        className={cn(
          'text-sm space-y-0 p-0 px-2 flex items-center bg-amber-300 border-b-2 border-solid border-amber-400 rounded-t-lg',
          toggleSidePanel ? 'rounded-tr-lg' : 'rounded-tl-lg'
        )}
        sidePanel={sidePanel}
        header={renderedHeader}
        currentDate={formatMessDate}
        contentclassname='p-0 px-2 overflow-auto'
        classNameContentFooter='flex flex-col pb-2 justify-between h-[50vh] backdrop-blur-xl py-2 bg-stone-50/80 overflow-y-auto'
        classNameFooter='p-2 bg-zinc-300'
        body={messageListContent}
        footer={footerContent}
      />
    </div>
  );
};

export default ChatContainer;
