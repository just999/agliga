'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import ChatTabsContent from '@/components/chat/chat-tabs-content';
import ChatTabsList from '@/components/chat/chat-tabs-list';
import { Tabs, TabsList } from '@/components/shadcn/ui';
import ClientOnly from '@/lib/client-only';
import { cn, createChatId } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { SafeAdminChat } from '@/types/types';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

type TabsChatContainerProps = {
  users: User[];
  adminProfile: SafeAdminChat;
  anonymousUser?: User;
};

const TabsChatContainer = ({
  users,
  adminProfile,
  anonymousUser,
}: TabsChatContainerProps) => {
  const { data: session, status } = useSession();
  const curUserId =
    status === 'authenticated' ? session?.user.id : anonymousUser?.id;
  const { usersId } = usePresenceStore((state) => ({ usersId: state.usersId }));
  const userRole = session ? session?.user.role : anonymousUser?.role;

  let userData;
  if (typeof window !== 'undefined') {
    const sessionId = sessionStorage.getItem('anonymousId');
    userData =
      status === 'unauthenticated'
        ? users.filter((user) => user.nonUserSessionId === sessionId)
        : [session?.user.curUser];
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    tab,
    chatId,
    setChatId,
    setTab,
    toggleStartChat,
    toggleSidePanel,
    setToggleStartChat,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    tab: state.tab,
    setTab: state.setTab,
    chatId: state.chatId,
    setChatId: state.setChatId,
    isToggle: state.isToggle,
    toggleSidePanel: state.toggleSidePanel,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  const onlineUsers = useMemo(
    () =>
      userRole === 'user'
        ? [adminProfile]
        : users.filter(
            (user) => usersId.includes(user.id) && user.role === 'user'
          ),
    [userRole, adminProfile, users, usersId]
  );

  const handleChatId = useCallback(
    (receiptUserId: string) => {
      if (curUserId) {
        const chatId = createChatId(curUserId, receiptUserId);
        setChatId(chatId);
      }
    },
    [curUserId, setChatId]
  );
  const onTabChange = useCallback(
    (value: string) => {
      if (value !== tab) {
        setTab(value);
        handleChatId(value);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
    },
    [tab, setTab, handleChatId]
  );

  useEffect(() => {
    if (onlineUsers.length > 0 && !tab && session) {
      const initialTabId =
        userRole === 'user' ? adminProfile?.id : onlineUsers[0]?.id;
      if (initialTabId) {
        onTabChange(initialTabId);
      }
    }
    if (status === 'unauthenticated') {
      const initialTabId =
        userRole === 'user' ? adminProfile.id : anonymousUser?.id;

      if (initialTabId) {
        onTabChange(initialTabId);
      }
    }
  }, [
    onlineUsers,
    userRole,
    adminProfile,
    tab,
    onTabChange,
    session,
    status,
    anonymousUser?.id,
  ]);

  const activeUser = useMemo(
    () =>
      userRole === 'admin'
        ? onlineUsers.find((user) => user.id === tab) || onlineUsers[0]
        : adminProfile,
    [userRole, onlineUsers, tab, adminProfile]
  );
  return (
    <ClientOnly>
      <div
        className={cn(
          'm-0 p-0 flex flex-col items-end justify-end rounded-t-lg'
        )}
      >
        <Tabs
          value={tab}
          onValueChange={onTabChange}
          className={cn(
            'max-h-[570px] z-10 grid grid-cols-[400px] bg-amber-100',
            toggleSidePanel ? 'rounded-t-lg' : 'rounded-t-lg'
          )}
        >
          <div
            className={cn(
              'relative rounded-t-lg',
              toggleSidePanel ? '' : 'rounded-t-lg'
            )}
          >
            <TabsList
              className={cn(
                'absolute top-0 left-0 h-full w-[50px] flex flex-col gap-2 justify-start backdrop-blur-sm bg-stone-500/10 transition-transform duration-300 ease-in-out',
                toggleSidePanel ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              {onlineUsers.map((user) => (
                <ChatTabsList
                  key={user?.id}
                  activeUser={activeUser}
                  user={user}
                  adminProfile={adminProfile}
                />
              ))}
            </TabsList>
            {onlineUsers.map((user, i) => (
              <ChatTabsContent
                // inputRef={inputRef}
                key={user.id}
                user={user}
                activeUser={activeUser}
                adminProfile={adminProfile}
                anonymousUser={anonymousUser}
                className={cn(
                  'max-h-[570px] rounded-t-lg',
                  i % 2 === 0 ? 'bg-amber-50' : 'bg-emerald-50'
                )}
              />
            ))}
          </div>
        </Tabs>
      </div>
    </ClientOnly>
  );
};

export default TabsChatContainer;
