'use client';

import LikeButton from '@/components/like-button';
import PresenceDot from '@/components/presence-dot';
import { capitalizeFirstCharacter, transformImageUrl } from '@/lib/utils';

import { User } from '@prisma/client';

import Link from 'next/link';
import { toggleLikeUser } from '@/actions/like-actions';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { banks } from '@/lib/helper';
import { getUnreadMessagesBySenderId } from '@/actions/message-actions';
import { Badge, Button } from '@/components/ui';
import { useChatStore } from '@/store/use-chat-store';
import { useSession } from 'next-auth/react';

type MemberCardProps = {
  user: User;
  likeIds: string[];
};

const MemberCard = ({ user, likeIds }: MemberCardProps) => {
  const [hasLiked, setHasLiked] = useState(likeIds.includes(user.id));
  const [count, setCount] = useState<number>();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnreadMessagesBySenderId(user.id);
      const { unreadMessCount } = res;
      setCount(unreadMessCount);
    };

    fetchData();
  }, [setCount, count, user.id]);

  const {
    isToggle,
    setIsToggle,
    setSenderId,
    setRecipientId,
    showBubbleChat,
    toggleStartChat,
    setToggleStartChat,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    setSenderId: state.setSenderId,
    setRecipientId: state.setRecipientId,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    showBubbleChat: state.showBubbleChat,
  }));

  const toggleLike = async () => {
    setLoading(true);
    try {
      await toggleLikeUser(user.id, hasLiked);
      setHasLiked(!hasLiked);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const userBank = banks.filter((bank) => bank.value === user.bank);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // const handleToggleChat = useCallback(() => {
  //   if (user) setRecipientId(user.id);
  //   if (session) setSenderId(session.user.id);
  //   setIsToggle(true);
  //   setShowBubbleChat(false);
  //   setTimeout(() => {
  //     setShowBubbleChat(false);
  //   }, 500);
  // }, [
  //   setIsToggle,
  //   setShowBubbleChat,
  //   session,
  //   setRecipientId,
  //   setSenderId,
  //   user,
  // ]);

  const handleToggleChat = useCallback(() => {
    setIsToggle(true);
    setToggleStartChat(true);
    setShowBubbleChat(false);
  }, [setIsToggle, setShowBubbleChat, setToggleStartChat]);

  useEffect(() => {
    if (isToggle) {
      setShowBubbleChat(false);
    }
  }, [isToggle, setShowBubbleChat]);
  return (
    <Card className='w-full relative shadow-lg p-2 bg-emerald-100'>
      <Button
        variant='ghost'
        // href={`/dashboard/chat/${user.id}`}
        onClick={handleToggleChat}
        className='flex flex-row items-center gap-2 cursor-pointer p-2 bg-emerald-400 rounded-t-lg'>
        <Image
          alt='user'
          width={50}
          height={50}
          src={transformImageUrl(user.image) || '/images/user.svg'}
          priority
          className='rounded-full object-cover'
        />
        <div onClick={preventLinkAction}>
          <div className='flex flex-col justify-start items-start text-xs '>
            <div className='text-white font-semibold '>{user.role}</div>
            {user.name && (
              <div className='text-gray-100 text-start font-semibold underline'>
                {capitalizeFirstCharacter(user.name)}
              </div>
            )}
          </div>
          <div className='absolute top-6 right-6'>
            <LikeButton
              toggleLike={toggleLike}
              loading={loading}
              hasLiked={hasLiked}
            />
          </div>
          <div className='absolute top-6 left-14 '>
            <PresenceDot user={user} sizeGoDot={12} sizeGoDotFill={16} />
          </div>
        </div>

        {count !== 0 ? (
          <div className='text-amber-100 text-sm text-center p-0 m-0 w-5  h-5 bg-rose-500 text-shadow rounded-full absolute top-0 right-0 '>
            {count}
          </div>
        ) : (
          <div></div>
        )}
      </Button>

      <CardFooter className='flex p-0 m-0 w-full justify-start bg-emerald-900 overflow-hidden  bottom-0 bg-emerald-gradient '>
        <div className='flex flex-col w-full mx-auto items-center justify-center py-2 bg-slate-200/50 px-2'>
          <span className='font-semibold flex-grow w-full text-stone-600'>
            {userBank.map(({ value, icon: Icon }) => (
              <span key={value} className='flex items-center gap-2 '>
                <span>
                  <Icon className='svg ' />
                </span>{' '}
                <span className='text-sm font-bold text-shadow '>{value}</span>
              </span>
            ))}
          </span>
          <span className='text-xs text-stone-600 w-full text-start break-normal'>
            {user.id}
          </span>
          <span className='text-xs text-stone-600 w-full text-start'>
            {user.accountNumber}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;