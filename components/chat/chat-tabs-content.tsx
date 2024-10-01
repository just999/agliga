'use client';

import { User } from '@prisma/client';
import { Button, Spinner, TabsContent } from '@/components/ui';
import {
  capitalizeFirstCharacter,
  cn,
  createChatId,
  formatShortDateTime,
  formattedDateMonthDate,
  normalizedDateTime,
} from '@/lib/utils';
import CardInnerWrapper from '../card-inner-wrapper';

import { useChatStore } from '@/store/use-chat-store';
import { useSession } from 'next-auth/react';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { MessagesProps } from './chat-container';
import MessageList from './message-list';
import ChatForm from './chat-form';
import { MessageCircleMore } from 'lucide-react';
import { BsChevronDown } from 'react-icons/bs';

import PresenceAvatar from '@/components/presence-avatar';

import { getMessageThread } from '@/actions/message-actions';
import { SafeAdminChat } from '@/types/types';

type ChatTabsContentProps = {
  activeUser: User | SafeAdminChat | null;
  user: User | SafeAdminChat;
  className?: string;
  adminProfile: SafeAdminChat;
  inputRef: RefObject<HTMLInputElement>;
};

const ChatTabsContent = ({
  activeUser,
  user,
  className,
  adminProfile,
  inputRef,
  ...props
}: ChatTabsContentProps) => {
  const [messages, setMessages] = useState<MessagesProps>();

  const { data: session } = useSession();
  const userRole = session?.user.role;
  const currentUserId = session?.user.id;

  const {
    tab,
    loading,
    setLoading,
    setTab,
    senderId,
    recipientId,
    setSenderId,
    setRecipientId,
    chatId,
    setChatId,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setToggleSidePanel,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    senderId: state.senderId,
    tab: state.tab,
    setTab: state.setTab,
    loading: state.loading,
    setLoading: state.setLoading,
    recipientId: state.recipientId,
    setSenderId: state.setSenderId,
    chatId: state.chatId,
    setChatId: state.setChatId,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
    showBubbleChat: state.showBubbleChat,
  }));
  useEffect(() => {
    setLoading(true);
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getMessageThread(user?.id);

        if (res && res.messages) {
          setMessages(res);
        } else {
          setMessages({ messages: [], readCount: 0 });
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages({ messages: [], readCount: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id, setMessages, setLoading, activeUser]);

  useEffect(() => {
    if (userRole === 'user' && adminProfile?.id) {
      const ci = createChatId(currentUserId, adminProfile?.id);
      if (ci)
        // setNewChatId(ci);
        setChatId(ci);
      setTab(adminProfile?.id);
    } else if (
      userRole === 'admin' &&
      adminProfile?.id &&
      activeUser?.role === 'user' &&
      activeUser?.id
    ) {
      const ci = createChatId(adminProfile?.id, activeUser?.id);
      if (ci)
        // setNewChatId(ci);
        setChatId(ci);
      setTab(activeUser?.id);
    }
  }, [
    activeUser?.id,
    activeUser?.role,
    adminProfile?.id,
    currentUserId,
    userRole,
    // setNewChatId,
    setChatId,
    setTab,
  ]);
  const handleToggleOff = useCallback(() => {
    if (session?.user.id) setSenderId(session?.user.id);

    setIsToggle(false);
    setShowBubbleChat(true); // Hide the BubbleChat immediately

    // Show BubbleChat after 500 milliseconds
    setTimeout(() => {
      setShowBubbleChat(true);
    }, 50);
  }, [
    // chatId,
    session?.user.id,
    // setChatId,
    setIsToggle,
    setSenderId,
    setShowBubbleChat,
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

  const renderedHeader = (
    <span className='flex flex-row justify-between w-full items-center p-0 h-11'>
      {/* {recipientData?.name && ( */}
      <span className='text-sky-400 flex gap-2 items-center justify-center h-10'>
        {user && (
          <PresenceAvatar
            user={user}
            src={user.image}
            className='min-w-6 h-auto'
          />
        )}
        {user?.name && capitalizeFirstCharacter(user?.name)}
      </span>
      {/* )} */}
      <span className='flex items-center gap-2 '>
        {' '}
        <MessageCircleMore size={18} className='svg text-blue-500' />{' '}
        <span className='text-shadow font-semibold text-blue-500'>Chat</span>
      </span>
      <Button
        variant='ghost'
        size='sm'
        type='button'
        aria-label='member chat'
        className='p-0 m-0 h-0 rounded-full hover:bg-emerald-700 hover:text-sky-700 pr-1'
        onClick={handleToggleOff}>
        {/* <Link href={`/members/${user.id}`}> */}
        <BsChevronDown
          size={24}
          className='p-1 fill-fuchsia-500 svg hover:fill-black hover:bg-amber-500 rounded-full'
        />
        {/* </Link> */}
      </Button>
    </span>
  );

  // if (loading) return <Spinner />;
  // if (!messages || messages.messages.length === 0) return null;
  // const sidePanel = role === 'admin' ? renderedSidePanel : '';
  const messageListContent = chatId && (
    <MessageList
      // key={`${chatId}-${user?.id}`}
      initialMessages={messages}
      currentUserId={currentUserId}
      chatId={chatId}
      user={session?.user.curUser}
    />
  );

  // console.log('ChatTabsContent render:', { user, chatId, messages });

  return (
    user && (
      <TabsContent
        {...props}
        value={user.id}
        className={cn('bg-indigo-50 m-0 p-0', className)}>
        <div
          className={cn(
            'p-0 bottom-0 w-full h-max-[570px] right-0 max-w-md z-50 transition-transform duration-300 items-end rounded-t-lg ',
            isToggle ? 'slide-down' : 'slide-up',
            toggleSidePanel
              ? ' shadow-lg'
              : ' border-l-transparent border-t-transparent shadow-none rounded-t-lg'
          )}>
          <CardInnerWrapper
            toggleSidePanel={toggleSidePanel}
            setToggleSidePanel={setToggleSidePanel}
            className={cn(
              'text-sm space-y-0 p-0 px-2 flex items-center bg-amber-300 border-b-2 border-solid border-amber-400 rounded-t-lg',
              toggleSidePanel ? 'rounded-tr-lg' : 'rounded-tl-lg'
            )}
            // sidePanel={sidePanel}
            header={renderedHeader}
            currentDate={formatMessDate}
            contentclassname='p-0 px-2 overflow-auto'
            classNameContentFooter='flex flex-col w-full pb-2 justify-between h-[500px] backdrop-blur-xl py-2 bg-stone-50/80 overflow-y-auto'
            classNameFooter='p-2 bg-zinc-300'
            body={messageListContent}
            footer={<ChatForm recipientData={user} />}
          />
        </div>
      </TabsContent>
    )
  );
};

export default ChatTabsContent;
