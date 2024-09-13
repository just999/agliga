'use client';

import { createChatId, transformImageUrl } from '@/lib/utils';
import { MessageDto } from '@/types';
import Image from 'next/image';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Button } from './ui';
import { useChatStore } from '@/store/use-chat-store';
import { useSession } from 'next-auth/react';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminChatProfile } from '@/lib/helper';

type NotificationToastProps = {
  image?: string | null;
  href?: string;
  title: string;
  subtitle?: string;
  message: MessageDto;
};

const NotificationToast = ({
  image,
  href,
  title,
  subtitle,
  message,
}: NotificationToastProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const adminChatId = adminChatProfile.id;

  const {
    isToggle,
    setIsToggle,
    chatId,
    setChatId,
    tab,
    setTab,
    setSenderId,
    setRecipientId,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    setSenderId: state.setSenderId,
    chatId: state.chatId,
    tab: state.tab,
    setChatId: state.setChatId,
    setTab: state.setTab,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const handleToggleChat = useCallback(
    (message: MessageDto) => {
      if (
        session?.user.role === 'user' &&
        message.senderId &&
        session?.user.id !== message.senderId
      ) {
        const newChatId = createChatId(session.user.id, message.senderId);
        if (newChatId) setChatId(newChatId);
        setTab(message.senderId);
      }
      if (
        session?.user.role === 'admin' &&
        message.senderId &&
        session?.user.id !== message.senderId
      ) {
        const newChatId = createChatId(adminChatId, message.senderId);
        if (newChatId) setChatId(newChatId);
        setTab(message.senderId);
      }

      setIsToggle(true);
      setShowBubbleChat(false);

      // if (session?.user.role === 'user') {
      //   setChatId(session.)
      // }
    },
    [
      adminChatId,
      session?.user.id,
      session?.user.role,
      setChatId,
      setIsToggle,
      setShowBubbleChat,
      setTab,
    ]
  );
  return (
    <Button variant='ghost' size='sm' onClick={() => handleToggleChat(message)}>
      {/* <Link href={href} className='flex items-center'> */}
      <div className='mr-2 '>
        <Image
          src={transformImageUrl(image) || '/images/user.png'}
          height={50}
          width={50}
          alt='Sender image'
        />
      </div>
      <div className='flex flex-grow justify-center '>
        <div className='font-semibold '>{title}</div>
        <div className='text-sm'>{subtitle || 'Click to view'}</div>
      </div>
      {/* </Link> */}
    </Button>
  );
};

export default NotificationToast;

export const newMessageToast = (message: MessageDto) => {
  toast(
    <NotificationToast
      message={message}
      image={message.senderImage}
      // href={`/dashboard/chat/${message.senderId}`}
      title={`${message.senderName} has sent you a new message`}
    />
  );
};

export const newLikeToast = (
  name: string,
  image: string | null,
  userId: string,
  message: MessageDto
) => {
  toast(
    <NotificationToast
      message={message}
      image={image}
      href={`/members/${userId}`}
      title={`You have been like by${name}`}
      subtitle='Click here to view their profile'
    />
  );
};
