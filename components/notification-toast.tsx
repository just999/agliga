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
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Button } from './shadcn/ui';

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
  const [anonymousUser, setAnonymousUser] = useState<User>();
  const { data: session, status } = useSession();
  const router = useRouter();

  const userRole =
    status === 'authenticated' ? session?.user.role : anonymousUser?.role;

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
    toggleStartChat,
    setToggleStartChat,
    setSenderId,
    setRecipientId,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    anoId: state.anoId,
    setAnoId: state.setAnoId,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
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

  const newUserId = status === 'authenticated' ? session.user.id : anoId;

  const handleToggleChat = useCallback(
    (message: MessageDto) => {
      if (
        userRole === 'user' &&
        message.senderId &&
        session?.user.id !== message.senderId
      ) {
        const newChatId = createChatId(newUserId, message.senderId);
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
      setToggleStartChat(true);
      setShowBubbleChat(false);

      // if (session?.user.role === 'user') {
      //   setChatId(session.)
      // }
    },
    [
      userRole,
      session?.user.id,
      session?.user.role,
      setIsToggle,
      setToggleStartChat,
      setShowBubbleChat,
      newUserId,
      setChatId,
      setTab,
      adminChatId,
    ]
  );

  return (
    <Button variant='ghost' size='sm' onClick={() => handleToggleChat(message)}>
      {/* <Link href={href} className='flex items-center'> */}
      <div className='mr-2 '>
        <Image
          src={transformImageUrl(image) || '/img/user.svg'}
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
