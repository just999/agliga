'use client';

import { getUnreadMessagesBySenderId } from '@/actions/message-actions';
import Image from 'next/image';
import { Button, Card, CardFooter } from '@/components/ui';
import {
  capitalizeFirstCharacter,
  cn,
  createChatId,
  transformImageUrl,
} from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { useCallback, useEffect, useState } from 'react';
import loading from '@/app/loading';
import LikeButton from '@/components/like-button';
import PresenceDot from '@/components/presence-dot';

type ChatSidebarProps = {
  user: User;
  navLinks: {
    name: string;
    href: string;
  }[];
  className?: string;
};

const ChatSidebar = ({ user, navLinks, className }: ChatSidebarProps) => {
  const [count, setCount] = useState<number>();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const res = await getUnreadMessagesBySenderId(user.id);
      const { unreadMessCount } = res;
      setCount(unreadMessCount);
    };

    fetchData();
  }, [setCount, count, user?.id, user]);

  const {
    isToggle,
    setIsToggle,
    setChatId,
    setSenderId,
    setRecipientId,
    setToggleStartChat,
    showBubbleChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    setSenderId: state.setSenderId,
    setChatId: state.setChatId,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setToggleStartChat: state.setToggleStartChat,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleToggleChat = useCallback(
    (user: User) => {
      if (user) setRecipientId(user.id);
      if (session) setSenderId(session.user.id);
      const chatId = createChatId(session?.user.id, user.id);

      setChatId(chatId);
      setIsToggle(true);
      setToggleStartChat(true);
      setShowBubbleChat(false);
      setTimeout(() => {
        setShowBubbleChat(false);
      }, 500);
    },
    [
      setIsToggle,
      setShowBubbleChat,
      session,
      setRecipientId,
      setSenderId,

      setChatId,
      setToggleStartChat,
    ]
  );

  return (
    <Card className='w-full relative p-.5 bg-zinc-100 shadow-sm'>
      {user && (
        <Link
          // variant='ghost'
          href={`/dashboard/admin/users/${user.id}/chat`}
          className='flex flex-row items-center gap-0 cursor-pointer p-0 m-0 bg-stone-200 rounded-t-lg'>
          <Image
            alt='user'
            width={30}
            height={30}
            src={transformImageUrl(user.image) || '/images/user.svg'}
            priority
            className='rounded-full object-cover'
            onClick={() => handleToggleChat(user)}
          />
          <div>
            {/* <div className='flex flex-col justify-start items-start text-xs '>
            <div className='text-white font-semibold '>{user.role}</div>
            {user.name && (
              <div className='text-gray-100 text-start font-semibold underline'>
                {capitalizeFirstCharacter(user.name)}
              </div>
            )}
          </div> */}
            {/* <div className='absolute top-6 right-6'>
            <LikeButton
              toggleLike={toggleLike}
              loading={loading}
              hasLiked={hasLiked}
            />
          </div> */}
            <div
              className='absolute top-6 left-14 '
              onClick={preventLinkAction}>
              <PresenceDot user={user} sizeGoDot={12} sizeGoDotFill={16} />
            </div>
          </div>

          {count !== 0 ? (
            <div className='text-amber-100 text-sm text-center p-0 m-0 w-5  h-5 bg-rose-500 text-shadow rounded-full absolute top-0 right-0 z-40'>
              {count}
            </div>
          ) : (
            <div></div>
          )}
        </Link>
      )}
      {/* <CardFooter>
        {user && (
          <div className='text-gray-100 text-start font-semibold underline'>
            {capitalizeFirstCharacter(user.name?.substring(0, 3) || '')}
          </div>
        )}
      </CardFooter> */}
    </Card>
  );
};

export default ChatSidebar;
