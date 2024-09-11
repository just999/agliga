'use client';

import { Button, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { usePresenceStore } from '@/store/use-presence-store';
import { User } from '@prisma/client';
import ChatTabsList from './chat-tabs-list';
import { cn, createChatId } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import ChatTabsContent from './chat-tabs-content';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDownSquareIcon } from 'lucide-react';

import { setTimeout } from 'timers';
import UserAvatar from '../user-avatar';
import { getUnreadMessagesBySenderId } from '@/actions/message-actions';

type NewChatContainerProps = {
  users: User[];
  adminProfile: User | null;
};

const NewChatContainer = ({ users, adminProfile }: NewChatContainerProps) => {
  const [count, setCount] = useState<number>(0);
  const { data: session } = useSession();
  const curUserId = session?.user.id;
  const { usersId } = usePresenceStore((state) => ({ usersId: state.usersId }));
  const userRole = session?.user.role;

  const inputRef = useRef<HTMLInputElement>(null);

  // const formRef = useRef<ChatFormHandle>(null);
  const adminUser = userRole === 'admin' ? users : adminProfile;
  const {
    tab,
    setTab,
    chatId: chId,
    setChatId,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setShowBubbleChat,
  } = useChatStore((state) => ({
    chatId: state.chatId,
    setChatId: state.setChatId,
    tab: state.tab,
    setTab: state.setTab,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
  }));
  const onlineUsers =
    userRole === 'user'
      ? users.filter(
          (user) => usersId.includes(user.id) && user.role === 'admin'
        )
      : users.filter((user) => usersId.includes(user.id));
  const handleChatId = useCallback(
    (receiptUserId: string) => {
      const userId = session?.user.id;
      if (userId) {
        const chatId = createChatId(userId, receiptUserId);
        setChatId(chatId);
      }
    },
    [setChatId, session?.user.id]
  );

  useEffect(() => {
    if (onlineUsers.length > 0 && !tab) {
      const initialTabId =
        userRole === 'user' ? adminProfile?.id : onlineUsers[0]?.id;
      if (initialTabId) {
        setTab(initialTabId);
        handleChatId(initialTabId);
      }
    }
  }, [userRole, adminProfile, onlineUsers, tab, setTab, handleChatId]);
  const handleToggleChat = useCallback(() => {
    setIsToggle(false);
    setShowBubbleChat(true);

    setTimeout(() => {
      setShowBubbleChat(true);
    }, 500);
  }, [setIsToggle, setShowBubbleChat]);

  const onTabChange = useCallback(
    (value: string) => {
      setTab(value);
      handleChatId(value);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    },
    [setTab, handleChatId]
  );

  useEffect(() => {
    if (onlineUsers.length > 0 && !tab) {
      const initialTabId =
        userRole === 'user' ? adminProfile?.id : onlineUsers[0]?.id;
      if (initialTabId) {
        onTabChange(initialTabId);
      }
    }
  }, [onlineUsers, userRole, adminProfile, tab, onTabChange]);

  const activeUser =
    userRole === 'admin'
      ? onlineUsers.find((user) => user.id === tab) || onlineUsers[0]
      : adminProfile;
  // const renderedChatTabsList = onlineUsers.map(user=>{
  //   if(user)
  // })

  // const unreadMessagesPromises =
  //   Array.isArray(adminUser) &&
  //   adminUser.map((user) => getUnreadMessagesBySenderId(user.id));

  return (
    <div
      className={cn(
        'm-0 p-0 flex flex-col items-end justify-end rounded-t-lg'
      )}>
      {isToggle && (
        <Button
          onClick={handleToggleChat}
          type='button'
          variant='ghost'
          size='sm'
          className={cn(
            'group h-full z-999 flex gap-2 text-white font-extrabold text-shadow text-sm bg-sky-500 hover:bg-blue-500/90 py-1',
            isToggle && 'hidden'
          )}>
          <ChevronDownSquareIcon
            size={24}
            className='svg text-white group-hover:text-gray-700'
          />
          <span className='text-white group-hover:text-gray-700'>Close</span>
        </Button>
      )}
      <Tabs
        value={tab}
        onValueChange={onTabChange}
        className={cn(
          'h-[570px] z-10 grid grid-cols-[400px] bg-amber-100',
          toggleSidePanel ? 'rounded-t-lg' : 'rounded-t-lg'
        )}>
        <div
          className={cn(
            'relative rounded-t-lg',
            toggleSidePanel ? '' : 'rounded-t-lg'
          )}>
          <TabsList
            className={cn(
              'absolute top-0 left-0 h-full w-[50px] flex flex-col gap-2 justify-start backdrop-blur-sm bg-stone-500/10 transition-transform duration-300 ease-in-out',
              toggleSidePanel ? 'translate-x-0' : '-translate-x-full'
            )}>
            {onlineUsers.map((user) => (
              // <span key={user.id} onClick={() => handleChatId(user.id)}>
              //   <ChatTabsList user={user} adminProfile={adminProfile} />
              // </span>

              <ChatTabsList
                key={user?.id}
                activeUser={activeUser}
                user={user}
                adminProfile={adminProfile}
              />

              // <TabsTrigger
              //   key={user.id}
              //   value={user.id}
              //   onClick={() => handleChatId(user.id)}
              //   className={cn(
              //     'flex flex-col p-0  justify-start gap-2  w-13 h-13 group hover:grayscale-0',
              //     activeUser === user
              //       ? 'data-[state=active]:bg-yellow-500'
              //       : 'data-[state=inactive]:bg-muted-foreground/80 grayscale'
              //   )}>
              //   {user.image && user.name && (
              //     <UserAvatar
              //       src={user.image}
              //       alt={user.name}
              //       className='h-12 w-12 justify-center'
              //       avatarClass={cn(
              //         'w-10 h-10 grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:scale-110 hover:bg-slate-100 duration-300',
              //         activeUser === user
              //           ? 'border border-2 border-white'
              //           : 'border-none'
              //       )}
              //     />
              //   )}
              // </TabsTrigger>
            ))}
          </TabsList>
          {onlineUsers.map((user, i) => (
            <ChatTabsContent
              inputRef={inputRef}
              key={user.id}
              user={user}
              activeUser={activeUser}
              adminProfile={adminProfile}
              className={cn(
                'h-[570px] rounded-t-lg',
                i % 2 === 0 ? 'bg-amber-50' : 'bg-emerald-50'
              )}
            />
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default NewChatContainer;
