// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { pusherClient } from '@/lib/pusher';

// import MessageBox from './message-box';
// import { MessageDto } from '@/types';
// import { Channel } from 'pusher-js';
// import { useMessageStore } from '@/store/use-message-store';

// import { formatShortDateTime } from '@/lib/utils';
// import { AnonymousUser, User } from '@prisma/client';
// import { useSession } from 'next-auth/react';

// type MessageListProps = {
//   initialMessages: { messages: MessageDto[]; readCount: number } | undefined;
//   currentUserId: string;
//   chatId: string;
//   user?: User;
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
//   const channelRef = useRef<Channel | null>(null);
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState<MessageDto[]>(
//     initialMessages?.messages || []
//   );
//   const { updateUnreadCount } = useMessageStore((state) => ({
//     updateUnreadCount: state.updateUnreadCount,
//   }));

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
//       channelRef.current = pusherClient.subscribe(chatId);
//       channelRef.current.bind('message:new', handleNewMessage);
//       channelRef.current.bind('messages:read', handleReadMessages);
//     }
//     return () => {
//       if (channelRef.current && channelRef.current.subscribed) {
//         channelRef.current.unsubscribe();
//         channelRef.current.unbind('message:new', handleNewMessage);
//         channelRef.current.unbind('messages:read', handleReadMessages);
//       }
//     };
//   }, [chatId, handleNewMessage, handleReadMessages]);
//   // console.log('MessageList render:', { chatId, initialMessages });

//   if (messages.length === 0) {
//     return <div className='text-center py-8'>No messages yet.</div>;
//   }

//   const curUserOnline = session ? user : anonymousUser;

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

import { MessageDto } from '@/types';
import { User } from '@prisma/client';

import { useState, useEffect, FormEvent, useRef, useCallback } from 'react';

import MessageBox from './message-box';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '@/store/use-message-store';
import { formatShortDateTime } from '@/lib/utils';
import { pusherClient } from '@/lib/pusher';
import { Channel } from 'pusher-js';

type MessageListProps = {
  initialMessages: { messages: MessageDto[]; readCount: number } | undefined;
  currentUserId: string;
  chatId: string;
  user?: User;
  anonymousUser?: User;
};

export default function MessageList({
  initialMessages,
  anonymousUser,
  currentUserId,
  chatId,
  user,
}: MessageListProps) {
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
      channelRef.current = pusherClient.subscribe(`presence-${chatId}`);
      channelRef.current.bind(
        'pusher:subscription_succeeded',
        (members: any) => {
          console.log('Successfully subscribed to the channel');
          console.log('Members count:', members.count);
        }
      );
      channelRef.current.bind('pusher:member_added', (member: any) => {
        console.log('Member added:', member.info);
      });
      channelRef.current.bind('pusher:member_removed', (member: any) => {
        console.log('Member removed:', member.info);
      });
      channelRef.current.bind('message:new', handleNewMessage);
      channelRef.current.bind('messages:read', handleReadMessages);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  // const sendMessage = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (channel && newMessage.trim()) {
  //     const messageData: Message = {
  //       id: Date.now().toString(),
  //       text: newMessage,
  //       sender: 'User', // You can replace this with the actual user identifier
  //     };
  //     channel.trigger('client-message', messageData);
  //     setMessages((prevMessages) => [...prevMessages, messageData]);
  //     setNewMessage('');
  //   }
  // };

  if (messages.length === 0) {
    return <div className='text-center py-8'>No messages yet.</div>;
  }

  const curUserOnline = session ? user : anonymousUser;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Customer Support Chat</h1>
      <div className='bg-gray-100 p-4 h-96 overflow-y-auto mb-4'>
        {curUserOnline &&
          messages.map((msg) => (
            // <div key={msg.id} className='mb-2'>
            //   <strong>{msg.sender}:</strong> {msg.text}
            // </div>
            <MessageBox
              key={msg.id}
              user={user}
              message={msg}
              currentUserId={currentUserId}
              anonymousUser={anonymousUser}
            />
          ))}
      </div>
      {/* <form onSubmit={sendMessage} className='flex'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='flex-grow border p-2 mr-2'
          placeholder='Type your message...'
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2'>
          Send
        </button>
      </form> */}
    </div>
  );
}
