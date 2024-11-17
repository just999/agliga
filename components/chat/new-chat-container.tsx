// 'use client';

// import { Button, Tabs, TabsList } from '@/components/ui';
// import { usePresenceStore } from '@/store/use-presence-store';
// import { User } from '@prisma/client';
// import ChatTabsList from './chat-tabs-list';
// import { cn, createChatId } from '@/lib/utils';
// import { useChatStore } from '@/store/use-chat-store';
// import ChatTabsContent from './chat-tabs-content';

// import { useSession } from 'next-auth/react';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { ChevronDownSquareIcon } from 'lucide-react';

// import { setTimeout } from 'timers';

// type NewChatContainerProps = {
//   users: User[];
//   adminProfile: User | null;
// };

// const NewChatContainer = ({ users, adminProfile }: NewChatContainerProps) => {
//   const [count, setCount] = useState<number>(0);
//   const { data: session } = useSession();
//   const curUserId = session?.user.id;
//   const { usersId } = usePresenceStore((state) => ({ usersId: state.usersId }));
//   const userRole = session?.user.role;

//   const inputRef = useRef<HTMLInputElement>(null);

//   // const formRef = useRef<ChatFormHandle>(null);
//   const adminUser =
//     userRole === 'admin'
//       ? users.filter((user) => user.role !== 'admin')
//       : adminProfile;

//   const {
//     tab,
//     setTab,
//     chatId: chId,
//     setChatId,
//     isToggle,
//     setIsToggle,
//     toggleSidePanel,
//     setShowBubbleChat,
//   } = useChatStore((state) => ({
//     chatId: state.chatId,
//     setChatId: state.setChatId,
//     tab: state.tab,
//     setTab: state.setTab,
//     setIsToggle: state.setIsToggle,
//     setShowBubbleChat: state.setShowBubbleChat,
//     isToggle: state.isToggle,
//     setToggleSidePanel: state.setToggleSidePanel,
//     toggleSidePanel: state.toggleSidePanel,
//   }));
//   const onlineUsers =
//     userRole === 'user'
//       ? users.filter(
//           (user) => usersId.includes(user.id) && user.role === 'admin'
//         )
//       : users.filter((user) => usersId.includes(user.id));

//   const handleChatId = useCallback(
//     (receiptUserId: string) => {
//       const userId = session?.user.id;
//       if (userId) {
//         const chatId = createChatId(userId, receiptUserId);
//         setChatId(chatId);
//       }
//     },
//     [setChatId, session?.user.id]
//   );

//   useEffect(() => {
//     if (onlineUsers.length > 0 && !tab) {
//       const initialTabId =
//         userRole === 'user' ? adminProfile?.id : onlineUsers[0]?.id;
//       if (initialTabId) {
//         setTab(initialTabId);
//         handleChatId(initialTabId);
//       }
//     }
//   }, [userRole, adminProfile, onlineUsers, tab, setTab, handleChatId]);

//   const handleToggleChat = useCallback(() => {
//     setIsToggle(false);
//     setShowBubbleChat(true);

//     setTimeout(() => {
//       setShowBubbleChat(true);
//     }, 500);
//   }, [setIsToggle, setShowBubbleChat]);

//   const onTabChange = useCallback(
//     (value: string) => {
//       setTab(value);
//       handleChatId(value);
//       setTimeout(() => {
//         if (inputRef.current) {
//           inputRef.current.focus();
//           const length = inputRef.current.value.length;
//           inputRef.current.setSelectionRange(length, length);
//         }
//       }, 0);
//     },
//     [setTab, handleChatId]
//   );

//   useEffect(() => {
//     if (onlineUsers.length > 0 && !tab) {
//       const initialTabId =
//         userRole === 'user' ? adminProfile?.id : onlineUsers[0]?.id;
//       if (initialTabId) {
//         onTabChange(initialTabId);
//       }
//     }
//   }, [onlineUsers, userRole, adminProfile, tab, onTabChange]);

//   const activeUser =
//     userRole === 'admin'
//       ? onlineUsers.find((user) => user.id === tab) || onlineUsers[0]
//       : adminProfile;

//   return (
//     <div
//       className={cn(
//         'm-0 p-0 flex flex-col items-end justify-end rounded-t-lg'
//       )}>
//       {isToggle && (
//         <Button
//           onClick={handleToggleChat}
//           type='button'
//           variant='ghost'
//           size='sm'
//           className={cn(
//             'group h-full z-999 flex gap-2 items-center text-wrap  text-white font-extrabold text-shadow text-sm bg-sky-500 hover:bg-blue-500/90 py-1',
//             isToggle && ''
//           )}>
//           <ChevronDownSquareIcon
//             size={24}
//             className='svg text-white group-hover:text-gray-700'
//           />
//           <span className='text-white group-hover:text-gray-700'>Close</span>
//         </Button>
//       )}
//       <Tabs
//         onLoadedData={(e) => console.log(e)}
//         value={tab}
//         onValueChange={onTabChange}
//         className={cn(
//           'h-[570px] z-10 grid grid-cols-[400px] bg-amber-100',
//           toggleSidePanel ? 'rounded-t-lg' : 'rounded-t-lg'
//         )}>
//         <div
//           className={cn(
//             'relative rounded-t-lg',
//             toggleSidePanel ? '' : 'rounded-t-lg'
//           )}>
//           <TabsList
//             className={cn(
//               'absolute top-0 left-0 h-full w-[50px] flex flex-col gap-2 justify-start backdrop-blur-sm bg-stone-500/10 transition-transform duration-300 ease-in-out',
//               toggleSidePanel ? 'translate-x-0' : '-translate-x-full'
//             )}>
//             {onlineUsers.map((user) => (
//               <ChatTabsList
//                 key={user?.id}
//                 activeUser={activeUser}
//                 user={user}
//                 adminProfile={adminProfile}
//               />
//             ))}
//           </TabsList>
//           {onlineUsers.map((user, i) => (
//             <ChatTabsContent
//               inputRef={inputRef}
//               key={user.id}
//               user={user}
//               activeUser={activeUser}
//               adminProfile={adminProfile}
//               className={cn(
//                 'h-[570px] rounded-t-lg',
//                 i % 2 === 0 ? 'bg-amber-50' : 'bg-emerald-50'
//               )}
//             />
//           ))}
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default NewChatContainer;

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Tabs, TabsList } from '@/components/shadcn/ui';
import { cn, createChatId } from '@/lib/utils';
import { useChatStore } from '@/store/use-chat-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { SafeAdminChat } from '@/types/types';
import { User } from '@prisma/client';
import { ChevronDownSquareIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import ChatTabsContent from './chat-tabs-content';
import ChatTabsList from './chat-tabs-list';

type NewChatContainerProps = {
  users: User[];
  adminProfile: SafeAdminChat;
};

const NewChatContainer = ({ users, adminProfile }: NewChatContainerProps) => {
  const { data: session } = useSession();
  const curUserId = session?.user.id;
  const { usersId } = usePresenceStore((state) => ({ usersId: state.usersId }));
  const userRole = session?.user.role;

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    tab,
    setChatId,
    setTab,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    toggleSidePanel,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    setChatId: state.setChatId,
    setTab: state.setTab,
    tab: state.tab,
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
    toggleSidePanel: state.toggleSidePanel,
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

  const handleToggleChat = useCallback(() => {
    setIsToggle(false);
    setShowBubbleChat(true);
  }, [setIsToggle, setShowBubbleChat]);

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
    [setTab, handleChatId, tab]
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

  const activeUser = useMemo(
    () =>
      userRole === 'admin'
        ? onlineUsers.find((user) => user.id === tab) || onlineUsers[0]
        : adminProfile,
    [userRole, onlineUsers, tab, adminProfile]
  );

  return (
    <div
      className={cn('m-0 p-0 flex flex-col items-end justify-end rounded-t-lg')}
    >
      {isToggle && (
        <Button
          onClick={handleToggleChat}
          type='button'
          variant='ghost'
          size='sm'
          className={cn(
            'group h-full flex gap-2 items-center text-wrap text-white font-extrabold text-shadow text-sm bg-sky-500 hover:bg-blue-500/90 py-1',
            isToggle && ''
          )}
        >
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
          'max-h-[570px] grid grid-cols-[400px] bg-amber-100',
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

export default NewChatContainer;
