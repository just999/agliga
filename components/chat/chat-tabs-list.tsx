'use client';

import { Avatar, AvatarFallback, TabsList, TabsTrigger } from '@/components/ui';
import { useChatStore } from '@/store/use-chat-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { User } from '@prisma/client';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useCallback, useEffect, useState } from 'react';
import UserAvatar from '../user-avatar';
import { userRole } from '@/lib/auth';
import { cn, createChatId } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { getUnreadMessagesBySenderId } from '@/actions/message-actions';

type ChatTabsListProps = {
  activeUser: User | null;
  user: User;
  adminProfile: User | null;
};

const ChatTabsList = ({
  user,
  adminProfile,
  activeUser,
}: ChatTabsListProps) => {
  const [userData, setUserData] = useState<User>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnreadMessagesBySenderId(user.id);
      if (res) {
        const { unreadMessCount } = res;
        if (unreadMessCount) setCount(unreadMessCount);
      }
    };
    fetchData();
  }, [user.id, setCount]);

  const {
    senderId,
    recipientId,
    setSenderId,
    setRecipientId,
    chatId,
    setChatId,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setToggleSidePanel,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    senderId: state.senderId,
    recipientId: state.recipientId,
    setSenderId: state.setSenderId,
    chatId: state.chatId,
    setChatId: state.setChatId,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
    showBubbleChat: state.showBubbleChat,
  }));

  useEffect(() => {
    if (user && user.id) {
      setUserData(user);
      setRecipientId(user.id);
    }
  }, [setRecipientId, user, user.id]);

  const handleChatId = useCallback(
    (recipientUserId: string) => {
      const userId = session?.user.id;
      const userRole = session?.user.role;
      if (userRole === 'user' && adminProfile?.id) {
        const chatId = createChatId(userId, adminProfile?.id);
        if (chatId) setChatId(chatId);
      } else if (userRole === 'admin') {
        const chatId = createChatId(userId, recipientUserId);
        if (chatId) setChatId(chatId);
      }
    },
    [setChatId, adminProfile?.id, session?.user.id, session?.user.role]
  );

  return (
    <TabsTrigger
      key={user.id}
      value={user.id}
      onClick={() => handleChatId(user.id)}
      className={cn(
        'flex flex-col p-0 m-0 items-center justify-start   w-13 h-13 group hover:grayscale-0',
        activeUser === user
          ? 'data-[state=active]:bg-yellow-500 p-0 m-0'
          : 'data-[state=inactive]:bg-muted-foreground/80 grayscale'
      )}>
      {user.image && user.name && (
        <>
          <UserAvatar
            src={user.image}
            alt={user.name}
            className='h-12 w-12 justify-center'
            avatarClass={cn(
              'w-11 h-11 grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:scale-110 hover:bg-slate-100 duration-300',
              activeUser === user
                ? 'border border-2 border-white'
                : 'border-none'
            )}
          />
          {count !== 0 ? (
            <div className='text-amber-100 text-sm text-center p-0 m-0 w-4 h-4 bg-rose-500 text-shadow rounded-full absolute top-0 right-0 grayscale-0 z-999'>
              {count}
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </TabsTrigger>
  );

  // return (
  //   <TabsTrigger
  //     key={user.id}
  //     value={user.id}
  //     onClick={() => handleChatId(user.id)}
  //     className={cn(
  //       'flex flex-col p-0 m-0  justify-start gap-2  w-13 h-13 group hover:grayscale-0',
  //       activeUser === user
  //         ? 'data-[state=active]:bg-yellow-500'
  //         : 'data-[state=inactive]:bg-muted-foreground/80 grayscale'
  //     )}>
  //     {user.image && user.name && (
  //       <>
  //         <UserAvatar
  //           src={user.image}
  //           alt={user.name}
  //           className='h-12 w-12 justify-center'
  //           avatarClass={cn(
  //             'w-10 h-10 grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:scale-110 hover:bg-slate-100 duration-300',
  //             activeUser === user
  //               ? 'border border-2 border-white data-[state=active]:bg-yellow-500'
  //               : 'border-none data-[state=inactive]:bg-muted-foreground/80 grayscale'
  //           )}
  //         />
  //         {count !== 0 ? (
  //           <div className='text-amber-100 text-sm text-center p-0 m-0 w-4 h-4 bg-rose-500 text-shadow rounded-full absolute top-0 right-0 grayscale-0 z-999'>
  //             {count}
  //           </div>
  //         ) : (
  //           <div></div>
  //         )}
  //       </>
  //     )}
  //   </TabsTrigger>
  // );
};

export default ChatTabsList;
