'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAnonymousUser } from '@/actions/live-chat-actions';
import { adminChatProfile } from '@/lib/helper';
import { createChatId, transformImageUrl } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { MessageDto } from '@/types';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { Button } from './shadcn/ui';

type NewMessageToastProps = {
  message: MessageDto;
};

const NewMessageToast = ({ message }: NewMessageToastProps) => {
  const [anonymousUser, setAnonymousUser] = useState<User>();
  const { data: session, status } = useSession();

  const adminChatId = adminChatProfile.id;

  const {
    anoId,
    isToggle,
    setIsToggle,
    setAnoId,
    chatId,
    setChatId,
    tab,
    setTab,
    setSenderId,
    setRecipientId,
    setToggleStartChat,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    anoId: state.anoId,
    setAnoId: state.setAnoId,
    setSenderId: state.setSenderId,
    chatId: state.chatId,
    tab: state.tab,
    setChatId: state.setChatId,
    setTab: state.setTab,
    setRecipientId: state.setRecipientId,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const userRole =
    status === 'authenticated' ? session?.user.role : anonymousUser?.role;

  const newUserId = status === 'authenticated' ? session.user.id : anoId;

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
              setAnoId(existingUser.data.id);
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
  }, [status, setAnoId]);

  const handleToggleChat = useCallback(
    (message: MessageDto) => {
      if (
        userRole === 'user' &&
        message.recipientId &&
        newUserId !== message.recipientId
      ) {
        const newChatId = createChatId(newUserId, message.recipientId);
        if (newChatId) setChatId(newChatId);
        setTab(message.recipientId);
      }
      if (
        userRole === 'admin' &&
        message.recipientId &&
        newUserId !== message.recipientId
      ) {
        const newChatId = createChatId(adminChatId, message.recipientId);
        if (newChatId) setChatId(newChatId);
        setTab(message.recipientId);
      }

      setIsToggle(true);
      setShowBubbleChat(false);
      setToggleStartChat(true);
      // if (session?.user.role === 'user') {
      //   setChatId(session.)
      // }
    },
    [
      userRole,
      newUserId,
      setIsToggle,
      setShowBubbleChat,
      setToggleStartChat,
      setChatId,
      setTab,
      adminChatId,
    ]
  );

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => handleToggleChat(message)}
      className='flex items-center '
    >
      <div className='mr-2'>
        <Image
          src={transformImageUrl(message.senderImage) || '/image/user.png'}
          height={50}
          width={50}
          alt='sender image'
        />
      </div>
      <div className='flex flex-grow flex-col justify-center '>
        <div className='font-semibold '>
          {message.senderName} sent you a message
        </div>
        <div className='text-sm '>Click to View</div>
      </div>
    </Button>
  );
};

export default NewMessageToast;

export const newMessageToast = (message: MessageDto) => {
  toast(<NewMessageToast message={message} />);
};
