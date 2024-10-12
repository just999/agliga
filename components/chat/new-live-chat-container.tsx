'use client';

import { cn, createChatId } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { SafeAdminChat } from '@/types/types';
import { Tabs, TabsList } from '@radix-ui/react-tabs';

import { useSession } from 'next-auth/react';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import ChatTabsContent from './chat-tabs-content';
import ChatTabsList from './chat-tabs-list';
import { User } from '@prisma/client';

import { getAnonymousUser } from '@/actions/live-chat-actions';

type NewLiveChatContainerProps = {
  users: User[];
  adminProfile: SafeAdminChat;
  // anonymousUser?: User;
};

const NewLiveChatContainer = ({
  users,
  adminProfile,
}: // anonymousUser,
NewLiveChatContainerProps) => {
  const [anonymousUser, setAnonymousUser] = useState<User>();
  const { data: session, status } = useSession();
  const curUserId =
    status === 'authenticated' ? session?.user.id : anonymousUser?.id;
  const { usersId, addUsers, remove, set, setUsers } = usePresenceStore(
    (state) => ({
      usersId: state.usersId,
      addUsers: state.addUsers,
      remove: state.remove,
      set: state.set,
      setUsers: state.setUsers,
    })
  );
  const userRole = session ? session?.user.role : anonymousUser?.role;

  const {
    anoId,
    setAnoId,
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
    anoId: state.anoId,
    setAnoId: state.setAnoId,
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

  const inputRef = useRef<HTMLInputElement>(null);
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
    <div
      className={cn(
        'm-0 p-0 flex flex-col items-end justify-end rounded-t-lg z-50'
      )}>
      <Tabs
        value={tab}
        onValueChange={onTabChange}
        className={cn(
          'max-h-[570px] grid grid-cols-[400px] bg-amber-100',
          toggleSidePanel ? 'rounded-t-lg' : 'rounded-t-lg'
        )}>
        <div
          className={cn(
            'relative rounded-t-lg',
            toggleSidePanel ? '' : 'rounded-t-lg'
          )}>
          <TabsList
            className={cn(
              'absolute top-0 left-0 h-full w-[50px] flex flex-col gap-1 justify-start backdrop-blur-sm bg-stone-500/10 transition-transform duration-300 ease-in-out',
              toggleSidePanel ? 'translate-x-0' : '-translate-x-full'
            )}>
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
              className={cn(
                'max-h-[570px] rounded-t-lg',
                i % 2 === 0 ? 'bg-amber-50' : 'bg-emerald-50'
              )}
            />
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default NewLiveChatContainer;
