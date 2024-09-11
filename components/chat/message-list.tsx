'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';

import MessageBox from './message-box';
import { MessageDto } from '@/types';
import { Channel } from 'pusher-js';
import { useMessageStore } from '@/store/use-message-store';

import { formatShortDateTime } from '@/lib/utils';
import { User } from '@prisma/client';

type MessageListProps = {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
  user: User;
};

const MessageList = ({
  initialMessages,
  currentUserId,
  chatId,
  user,
}: MessageListProps) => {
  const setReadCount = useRef(false);
  const channelRef = useRef<Channel | null>(null);

  const [messages, setMessages] = useState(initialMessages?.messages);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  useEffect(() => {
    if (!setReadCount.current) {
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
  return (
    <div className='overflow-auto'>
      {messages?.length === 0 ? (
        ''
      ) : (
        <div>
          {user &&
            messages?.map((message) => (
              <MessageBox
                key={message.id}
                user={user}
                message={message}
                currentUserId={currentUserId}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
