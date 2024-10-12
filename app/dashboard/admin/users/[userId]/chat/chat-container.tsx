// 'use client';

// import CardInnerWrapper from '@/components/card-inner-wrapper';
// import {
//   capitalizeFirstCharacter,
//   cn,
//   createChatId,
//   formatShortDateTime,
//   formattedDateMonthDate,
//   normalizedDateTime,
// } from '@/lib/utils';
// import ChatForm from './chat-form';
// import { MessageDto } from '@/types';
// import { SafeAdminChat, SafeUser } from '@/types/types';

// import { Button, Card } from '@/components/ui';
// import PresenceAvatar from '@/components/presence-avatar';
// import { BsChevronDown } from 'react-icons/bs';
// import { MessageCircleMore } from 'lucide-react';
// import { useSession } from 'next-auth/react';
// import { useCallback, useEffect, useState } from 'react';
// import { MessagesProps } from '@/components/chat/chat-container';
// import { useChatStore } from '@/store/use-chat-store';
// import { getMessageThread } from '@/actions/message-actions';
// import { User } from '@prisma/client';
// import MessageList from './message-list';

// type ChatContainerProps = {
//   activeUser?: User | SafeAdminChat | null;
//   user?: User | SafeUser;
//   className?: string;
//   adminProfile: SafeAdminChat;
//   // inputRef: RefObject<HTMLInputElement>;
//   anonymousUser?: User;
//   chId?: string;
//   initialMessages?: { messages: MessageDto[]; readCount: number } | undefined;
// };

// const ChatContainer = ({
//   chId,
//   initialMessages,
//   anonymousUser,
//   activeUser,
//   user,
//   className,
//   adminProfile,
//   // inputRef,
//   ...props
// }: ChatContainerProps) => {
//   const [messages, setMessages] = useState<MessagesProps>();

//   const { data: session } = useSession();
//   const userRole = session ? session?.user.role : anonymousUser?.role;
//   const currentUserId = session ? session?.user.id : anonymousUser?.id;
//   const {
//     tab,
//     loading,
//     setLoading,
//     setTab,
//     senderId,
//     recipientId,
//     setSenderId,
//     setRecipientId,
//     toggleStartChat,
//     chatId,
//     setChatId,
//     isToggle,
//     setIsToggle,
//     toggleSidePanel,
//     setToggleSidePanel,
//     setToggleStartChat,
//     setShowBubbleChat,
//     showBubbleChat,
//   } = useChatStore((state) => ({
//     senderId: state.senderId,
//     tab: state.tab,
//     setTab: state.setTab,
//     loading: state.loading,
//     setLoading: state.setLoading,
//     recipientId: state.recipientId,
//     setSenderId: state.setSenderId,
//     chatId: state.chatId,
//     setChatId: state.setChatId,
//     setRecipientId: state.setRecipientId,
//     toggleStartChat: state.toggleStartChat,
//     setIsToggle: state.setIsToggle,
//     setShowBubbleChat: state.setShowBubbleChat,
//     setToggleStartChat: state.setToggleStartChat,
//     isToggle: state.isToggle,
//     setToggleSidePanel: state.setToggleSidePanel,
//     toggleSidePanel: state.toggleSidePanel,
//     showBubbleChat: state.showBubbleChat,
//   }));

//   useEffect(() => {
//     setLoading(true);
//     if (!user?.id) {
//       return;
//     }
//     const fetchData = async () => {
//       try {
//         const res = await getMessageThread(user?.id, anonymousUser?.id);

//         if (res && res.messages) {
//           setMessages(res);
//         } else {
//           setMessages({ messages: [], readCount: 0 });
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setMessages({ messages: [], readCount: 0 });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user?.id, setMessages, setLoading, activeUser, anonymousUser?.id]);

//   useEffect(() => {
//     if (userRole === 'user' && adminProfile?.id) {
//       const ci = createChatId(currentUserId, adminProfile?.id);
//       if (ci)
//         // setNewChatId(ci);
//         setChatId(ci);
//       setTab(adminProfile?.id);
//     } else if (
//       userRole === 'admin' &&
//       adminProfile?.id &&
//       activeUser?.role === 'user' &&
//       activeUser?.id
//     ) {
//       const ci = createChatId(adminProfile?.id, activeUser?.id);
//       if (ci)
//         // setNewChatId(ci);
//         setChatId(ci);
//       setTab(activeUser?.id);
//     }
//   }, [
//     activeUser?.id,
//     activeUser?.role,
//     adminProfile?.id,
//     currentUserId,
//     userRole,
//     // setNewChatId,
//     setChatId,
//     setTab,
//   ]);

//   const handleToggleOff = useCallback(() => {
//     if (session?.user.id) setSenderId(session?.user.id);

//     setIsToggle(false);
//     setShowBubbleChat(true); // Hide the BubbleChat immediately
//     setToggleStartChat(false);
//     // Show BubbleChat after 500 milliseconds
//     setTimeout(() => {
//       setShowBubbleChat(true);
//     }, 50);
//   }, [
//     session?.user.id,
//     setIsToggle,
//     setSenderId,
//     setShowBubbleChat,
//     setToggleStartChat,
//   ]);

//   const normalizedMessageDateTime = messages?.messages.map(
//     (mes) => new Date(normalizedDateTime(mes.created))
//   );
//   const latestMessageDate =
//     normalizedMessageDateTime?.reduce((latest, current) => {
//       return new Date(current) > new Date(latest) ? current : latest;
//     }, new Date()) || new Date();

//   // if (!latestMessageDate) return null;
//   const formattedMessageDate = formatShortDateTime(latestMessageDate);
//   const formatMessDate = formattedDateMonthDate(formattedMessageDate);

//   const renderedHeader = (
//     <span className='flex flex-row justify-between w-full items-center p-0 h-11'>
//       {/* {recipientData?.name && ( */}
//       <span className='text-sky-400 flex gap-2 items-center justify-center h-10'>
//         {(user || anonymousUser) && (
//           <PresenceAvatar
//             user={user}
//             src={user?.image}
//             anonymousUser={anonymousUser}
//             className='min-w-6 h-auto'
//           />
//         )}
//         {user?.name && capitalizeFirstCharacter(user?.name)}
//       </span>
//       {/* )} */}
//       <span className='flex items-center gap-2 '>
//         <MessageCircleMore size={18} className='svg text-blue-500' />{' '}
//         <span className='text-shadow font-semibold text-blue-500'>Chat</span>
//       </span>
//       <Button
//         variant='ghost'
//         size='sm'
//         type='button'
//         aria-label='member chat'
//         className='p-0 m-0 h-0 rounded-full hover:bg-emerald-700 hover:text-sky-700 pr-1'
//         onClick={handleToggleOff}>
//         {/* <Link href={`/members/${user.id}`}> */}
//         <BsChevronDown
//           size={24}
//           className='p-1 fill-fuchsia-500 svg hover:fill-black hover:bg-amber-500 rounded-full'
//         />
//         {/* </Link> */}
//       </Button>
//     </span>
//   );

//   const messageListContent = chatId && (
//     <MessageList
//       // key={`${chatId}-${user?.id}`}
//       initialMessages={messages}
//       currentUserId={currentUserId}
//       chatId={chatId}
//       user={session?.user.curUser}
//       anonymousUser={anonymousUser}
//     />
//   );
//   return (
//     user && (
//       <div
//         className={cn(
//           'p-0 bottom-0 w-full h-max-[570px] right-0 max-w-md transition-transform duration-300 items-end rounded-t-lg ',
//           isToggle ? 'slide-down' : 'slide-up',
//           toggleSidePanel
//             ? ' shadow-lg'
//             : ' border-l-transparent border-t-transparent shadow-none rounded-t-lg'
//         )}>
//         <Card>
//           <CardInnerWrapper
//             header={renderedHeader}
//             className={cn(
//               'text-sm space-y-0 p-0 px-2 flex items-center bg-amber-300 border-b-2 border-solid border-amber-400 rounded-t-lg'
//             )}
//             currentDate={formatMessDate}
//             contentclassname='p-0 px-2 overflow-auto'
//             classNameContentFooter='flex flex-col w-full pb-2 justify-between h-[500px] backdrop-blur-xl py-2 bg-stone-50/80 overflow-y-auto'
//             classNameFooter='p-2 bg-zinc-300'
//             body={messageListContent}
//             footer={
//               <ChatForm recipientData={user} anonymousUser={anonymousUser} />
//             }
//           />
//         </Card>
//       </div>
//     )
//   );
// };

// export default ChatContainer;
'use client';

import CardInnerWrapper from '@/components/card-inner-wrapper';
import {
  capitalizeFirstCharacter,
  cn,
  formatShortDateTime,
  formattedDateMonthDate,
  normalizedDateTime,
} from '@/lib/utils';
import { MessageDto } from '@/types';
import { User } from '@prisma/client';
import ChatForm from './chat-form';
import PresenceAvatar from '@/components/presence-avatar';
import { MessageCircleMore } from 'lucide-react';
import { useChatStore } from '@/store/use-chat-store';
import { BsChevronDown } from 'react-icons/bs';
import MessageList from './message-list';
import { Button } from '@/components/ui';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

type ChatContainerProps = {
  userId: string;
  messages: { messages: MessageDto[]; readCount: number } | undefined;
  user: User | null;
  chatId: string;
};

const ChatContainer = ({
  userId,
  messages,
  user,
  chatId,
}: ChatContainerProps) => {
  const { data: session } = useSession();
  const normalizedMessageDateTime = messages?.messages.map(
    (mes) => new Date(normalizedDateTime(mes.created))
  );

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
    // chatId,
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
  const latestMessageDate =
    normalizedMessageDateTime?.reduce((latest, current) => {
      return new Date(current) > new Date(latest) ? current : latest;
    }, new Date()) || new Date();

  // if (!latestMessageDate) return null;
  const formattedMessageDate = formatShortDateTime(latestMessageDate);
  const formatMessDate = formattedDateMonthDate(formattedMessageDate);

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

  const renderedHeader = (
    <span className='flex justify-between w-full  items-center p-0 h-11 bg-orange-500'>
      <span className='text-amber-300 flex gap-2 items-center justify-center h-10'>
        {user && (
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
        <MessageCircleMore size={18} className='svg text-amber-300' />
        <span className='text-shadow font-semibold text-amber-300'>Chat</span>
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
          className='p-1 text-amber-300 svg hover:fill-black hover:bg-amber-500 rounded-full svg'
        />
      </Button>
    </span>
  );

  const messageListContent = chatId && (
    <MessageList
      // key={`${chatId}-${user?.id}`}
      initialMessages={messages}
      currentUserId={userId}
      chatId={chatId}
      user={session?.user.curUser}
    />
  );
  return (
    <div
      className={cn(
        'p-0 bottom-0 w-full h-[570px] right-0 max-w-md  transition-transform duration-300 items-end rounded-t-lg bg-slate-400 z-30',
        isToggle ? 'slide-down' : 'slide-up',
        toggleSidePanel
          ? ' shadow-lg'
          : ' border-l-transparent border-t-transparent shadow-none rounded-t-lg'
      )}>
      <div>HAI..........</div>
      <CardInnerWrapper
        toggleSidePanel={toggleSidePanel}
        setToggleSidePanel={setToggleSidePanel}
        className={cn(
          'text-sm space-y-0 p-0 px-2 flex items-center bg-amber-300 border-b-2 border-solid border-amber-400 rounded-t-lg'
        )}
        header={renderedHeader}
        currentDate={formatMessDate}
        contentclassname='p-0 px-2 overflow-auto'
        classNameContentFooter='flex flex-col w-full pb-2 justify-between h-[500px] backdrop-blur-xl py-2 bg-stone-50/80 overflow-y-auto'
        classNameFooter='p-2 bg-zinc-300'
        body={messageListContent}
        footer={user && <ChatForm recipientData={user} />}
      />
    </div>
  );
};

export default ChatContainer;
