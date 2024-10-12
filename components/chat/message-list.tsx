// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { pusherClient } from '@/lib/pusher';

// import MessageBox from './message-box';
// import { MessageDto } from '@/types';
// import { Channel } from 'pusher-js';
// import { useMessageStore } from '@/store/use-message-store';

// import { formatShortDateTime } from '@/lib/utils';
// import { User } from '@prisma/client';
// import { useSession } from 'next-auth/react';

// type MessageListProps = {
//   initialMessages: { messages: MessageDto[]; readCount: number } | undefined;
//   currentUserId: string;
//   chatId: string;
//   user: User;
//   anonymousUser?: User;
// };

// const MessageList = ({
//   initialMessages,
//   anonymousUser,
//   currentUserId,
//   chatId,
//   user,
// }: MessageListProps) => {
//   const setReadCount = useRef(false);
//   const [messages, setMessages] = useState<MessageDto[]>(
//     initialMessages?.messages || []
//   );
//   const { updateUnreadCount } = useMessageStore((state) => ({
//     updateUnreadCount: state.updateUnreadCount,
//   }));
//   const channelRef = useRef<Channel | null>(null);

//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (!setReadCount.current && initialMessages) {
//       updateUnreadCount(-initialMessages.readCount);
//     }
//     setReadCount.current = true;

//     if (initialMessages) setMessages(initialMessages.messages);
//   }, [
//     initialMessages?.readCount,
//     updateUnreadCount,
//     initialMessages,
//     setMessages,
//   ]);

//   const handleNewMessage = useCallback((message: MessageDto) => {
//     setMessages((prev) => [...prev, message]);
//   }, []);

//   const handleReadMessages = useCallback((messageIds: string[]) => {
//     setMessages((prev) =>
//       prev?.map((message) =>
//         messageIds.includes(message.id)
//           ? { ...message, dateRead: formatShortDateTime(new Date()) }
//           : message
//       )
//     );
//   }, []);

//   useEffect(() => {
//     if (!channelRef.current) {
//       channelRef.current = pusherClient.subscribe(`presence-${chatId}`);
//       channelRef.current.bind(
//         'pusher:subscription_succeeded',
//         (members: any) => {
//           console.log('Successfully subscribed to the channel');
//           console.log('Members count:', members.count);
//         }
//       );
//       channelRef.current.bind('pusher:member_added', (member: any) => {
//         console.log('Member added:', member.info);
//       });
//       channelRef.current.bind('pusher:member_removed', (member: any) => {
//         console.log('Member removed:', member.info);
//       });
//       channelRef.current.bind('message:new', handleNewMessage);
//       channelRef.current.bind('messages:read', handleReadMessages);
//     }
//     return () => {
//       if (channelRef.current && channelRef.current.subscribed) {
//         channelRef.current.unsubscribe();
//       }
//     };
//   }, [chatId, handleNewMessage, handleReadMessages]);
//   // console.log('MessageList render:', { chatId, initialMessages });

//   if (messages.length === 0) {
//     return <div className='text-center py-8'>No messages yet.</div>;
//   }

//   const curUserOnline = session ? user : anonymousUser;

//   const newCurrentUserId =
//     status === 'authenticated' ? currentUserId : anonymousUser?.id;
//   return (
//     <div className='overflow-auto'>
//       <div>
//         {curUserOnline &&
//           messages?.map((message) => (
//             <MessageBox
//               key={message.id}
//               user={user}
//               message={message}
//               currentUserId={currentUserId}
//               anonymousUser={anonymousUser}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MessageList;

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';

import MessageBox from './message-box';
import { MessageDto } from '@/types';
import { Channel } from 'pusher-js';
import { useMessageStore } from '@/store/use-message-store';

import { formatShortDateTime } from '@/lib/utils';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useChatStore } from '@/store/use-chat-store';
import { SafeAdminChat } from '@/types/types';

type MessageListProps = {
  initialMessages: { messages: MessageDto[]; readCount: number } | undefined;
  currentUserId: string;
  chatId: string;
  user?: SafeAdminChat;
  anonymousUser?: User;
};

const MessageList = ({
  initialMessages,
  anonymousUser,
  currentUserId,
  chatId,
  user,
}: MessageListProps) => {
  console.log('🚀 ~ chatId:', chatId);
  const setReadCount = useRef(false);
  const channelRef = useRef<Channel | null>(null);
  const { data: session } = useSession();
  const [messages, setMessages] = useState<MessageDto[]>(
    initialMessages?.messages || []
  );
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  useEffect(() => {
    if (!setReadCount.current && initialMessages) {
      updateUnreadCount(-initialMessages.readCount);
    }
    setReadCount.current = true;

    if (initialMessages) setMessages(initialMessages.messages);
  }, [
    initialMessages?.readCount,
    updateUnreadCount,
    initialMessages,
    setMessages,
  ]);

  const { anoId } = useChatStore((state) => ({
    anoId: state.anoId,
  }));

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prev) =>
      prev?.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      )
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);
      channelRef.current.bind('message:new', handleNewMessage);
      channelRef.current.bind('messages:read', handleReadMessages);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind('message:new', handleNewMessage);
        channelRef.current.unbind('messages:read', handleReadMessages);
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);
  // console.log('MessageList render:', { chatId, initialMessages });

  if (messages.length === 0) {
    return <div className='text-center py-8'>No messages yet.</div>;
  }

  const curUserOnline = session ? user : anonymousUser;

  return (
    <div className='overflow-auto'>
      <div>
        {user &&
          messages?.map((message) => (
            <MessageBox
              key={message.id}
              recipientUser={user}
              message={message}
              currentUserId={currentUserId}
              anonymousUser={anonymousUser}
            />
          ))}
      </div>
    </div>
  );
};

export default MessageList;
