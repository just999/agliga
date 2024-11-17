'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';

import { getAnonymousUser } from '@/actions/live-chat-actions';
import { getMessageThread } from '@/actions/message-actions';
import PresenceAvatar from '@/components/presence-avatar';
import { Button, TabsContent } from '@/components/shadcn/ui';
import {
  capitalizeFirstCharacter,
  cn,
  createChatId,
  formatShortDateTime,
  formattedDateMonthDate,
  normalizedDateTime,
} from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { MessageDto } from '@/types';
import { SafeAdminChat } from '@/types/types';
import { User } from '@prisma/client';
import { MessageCircleMore } from 'lucide-react';
import { useSession } from 'next-auth/react';
import user from 'pusher-js/types/src/core/user';
import { BsChevronDown } from 'react-icons/bs';

import CardInnerWrapper from '../card-inner-wrapper';
import { MessagesProps } from './chat-container';
import ChatForm from './chat-form';
import MessageList from './message-list';

type ChatTabsContentProps = {
  activeUser?: User | SafeAdminChat | null;
  user?: User | SafeAdminChat;
  className?: string;
  adminProfile: SafeAdminChat;
  // inputRef: RefObject<HTMLInputElement>;
  anonymousUser?: User;
  chId?: string;
  initialMessages?: { messages: MessageDto[]; readCount: number } | undefined;
};

const ChatTabsContent = ({
  chId,
  initialMessages,
  activeUser,
  user,
  className,
  adminProfile,
  // inputRef,
  ...props
}: ChatTabsContentProps) => {
  const [messages, setMessages] = useState<MessagesProps>();
  const [anonymousUser, setAnonymousUser] = useState<User>();

  const { data: session, status } = useSession();
  const userRole = session ? session?.user.role : anonymousUser?.role;

  const {
    tab,
    loading,
    setLoading,
    setTab,
    senderId,
    recipientId,
    setSenderId,
    setRecipientId,
    toggleStartChat,
    chatId,
    setChatId,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setToggleSidePanel,
    setToggleStartChat,
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
    toggleStartChat: state.toggleStartChat,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    setToggleStartChat: state.setToggleStartChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
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

  const newUserId =
    status === 'authenticated' ? session.user.id : anonymousUser?.id;

  const newUser =
    status === 'authenticated' ? session.user.curUser : anonymousUser;

  useEffect(() => {
    setLoading(true);
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getMessageThread(user.id, anonymousUser?.id);

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
  }, [user?.id, setMessages, setLoading, activeUser, anonymousUser?.id]);

  useEffect(() => {
    if (userRole === 'user' && adminProfile?.id && newUserId) {
      const ci = createChatId(newUserId, adminProfile?.id);
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
    newUserId,
    userRole,
    // setNewChatId,
    setChatId,
    setTab,
  ]);

  const handleToggleOff = useCallback(() => {
    if (session?.user.id) setSenderId(session?.user.id);

    setIsToggle(false);
    setShowBubbleChat(true); // Hide the BubbleChat immediately
    setToggleStartChat(false);
    // Show BubbleChat after 500 milliseconds
    setTimeout(() => {
      setShowBubbleChat(true);
    }, 50);
  }, [
    session?.user.id,
    setIsToggle,
    setSenderId,
    setShowBubbleChat,
    setToggleStartChat,
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
        {(user || anonymousUser) && (
          <PresenceAvatar
            user={user}
            src={user?.image}
            className='min-w-6 h-auto'
          />
        )}
        {user?.name && capitalizeFirstCharacter(user?.name)}
      </span>
      {/* )} */}
      <span className='flex items-center gap-2 '>
        <MessageCircleMore size={18} className='svg text-blue-500' />{' '}
        <span className='text-shadow font-semibold text-blue-500'>Chat</span>
      </span>
      <Button
        variant='ghost'
        size='sm'
        type='button'
        aria-label='member chat'
        className='p-0 m-0 h-0 rounded-full hover:bg-emerald-700 hover:text-sky-700 pr-1'
        onClick={handleToggleOff}
      >
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
  const messageListContent = chatId && newUserId && (
    <MessageList
      // key={`${chatId}-${user?.id}`}
      initialMessages={messages}
      currentUserId={newUserId}
      chatId={chatId}
      user={user}
      anonymousUser={anonymousUser}
    />
  );

  // console.log('ChatTabsContent render:', { user, chatId, messages });
  // let tabContentValue;
  // if (session) {
  //   tabContentValue = user.id;
  // } else if (!session) {
  //   tabContentValue = anonymousUser?.id;
  // }
  return (
    user && (
      <TabsContent
        {...props}
        value={user.id}
        className={cn('bg-indigo-50 m-0 p-0', className)}
      >
        <div
          className={cn(
            'p-0 bottom-0 w-[400px] h-max-[570px] right-0  z-50 transition-transform duration-300 items-end rounded-t-lg ',
            isToggle ? 'slide-down' : 'slide-up',
            toggleSidePanel
              ? ' shadow-lg'
              : ' border-l-transparent border-t-transparent shadow-none rounded-t-lg'
          )}
        >
          <CardInnerWrapper
            currentUser={newUser}
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
            classNameFooter='p-2 bg-zinc-300 drop-shadow-lg'
            body={messageListContent}
            footer={
              <ChatForm recipientData={user} anonymousUser={anonymousUser} />
            }
          />
        </div>
      </TabsContent>
    )
  );
};

export default ChatTabsContent;
