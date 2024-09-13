// 'use client';

// import { useCallback, useEffect, useMemo } from 'react';
// import { MessageCircleMore } from 'lucide-react';
// import { User } from '@prisma/client';
// import { useSession } from 'next-auth/react';

// import { Button } from '@/components/ui';
// import { useChatStore } from '@/store/use-chat-store';
// import { createChatId } from '@/lib/utils';
// import { usePresenceStore } from '@/store/use-presence-store';
// import NewChatContainer from '@/components/chat/new-chat-container';

// type NewChatWidgetProps = {
//   users: User[] | [];
//   adminProfile: User | null;
// };

// const NewChatWidget = ({ users, adminProfile }: NewChatWidgetProps) => {
//   const { data: session } = useSession();
//   const curUserId = session?.user.id;

//   const currentUser = session?.user.curUser;

//   const userRole = session?.user.role;

//   const filteredUsersOnly = useMemo(
//     () => users.filter((user) => user.role !== 'admin'),
//     [users]
//   );

//   const {
//     senderId,
//     recipientId,
//     setSenderId,
//     setRecipientId,
//     chatId,
//     tab,
//     setTab,
//     setChatId,
//     isToggle,
//     setIsToggle,
//     toggleSidePanel,
//     setToggleSidePanel,
//     setShowBubbleChat,
//     showBubbleChat,
//   } = useChatStore((state) => ({
//     senderId: state.senderId,
//     recipientId: state.recipientId,
//     setSenderId: state.setSenderId,
//     chatId: state.chatId,
//     tab: state.tab,
//     setChatId: state.setChatId,
//     setTab: state.setTab,
//     setRecipientId: state.setRecipientId,
//     setIsToggle: state.setIsToggle,
//     setShowBubbleChat: state.setShowBubbleChat,
//     isToggle: state.isToggle,
//     setToggleSidePanel: state.setToggleSidePanel,
//     toggleSidePanel: state.toggleSidePanel,
//     showBubbleChat: state.showBubbleChat,
//   }));

//   const { usersId } = usePresenceStore();

//   useEffect(() => {
//     if (!usersId || !users || !adminProfile?.id) return;

//     const activeUsers = filteredUsersOnly.filter((user) =>
//       usersId.includes(user.id)
//     );

//     if (activeUsers.length === 0) return;

//     if (userRole === 'user') {
//       const chatId = createChatId(curUserId, adminProfile.id);
//       if (chatId) setChatId(chatId);
//       setTab(adminProfile.id);
//     } else if (userRole === 'admin') {
//       const activeUser = activeUsers[0]; // Assuming you want to set for the first active user
//       const chatId = createChatId(adminProfile.id, activeUser.id);
//       if (chatId) setChatId(chatId);
//       setTab(activeUser.id);
//     }
//   }, [
//     usersId,
//     users,
//     adminProfile,
//     userRole,
//     curUserId,
//     filteredUsersOnly,
//     setChatId,
//     setTab,
//   ]);

//   const handleToggleChat = useCallback(() => {
//     setIsToggle(true);
//     setShowBubbleChat(false);

//     // if (chatId) setChatId(chatId);

//     setTimeout(() => {
//       setShowBubbleChat(false);
//     }, 500);
//   }, [setIsToggle, setShowBubbleChat]);
//   return (
//     <div className='w-13 h-13 m-0 p-0 relative'>
//       <div
//         className={`fixed bottom-28 right-2 shadow-lg transition-transform duration-300 ease-in-out transform ${
//           isToggle ? 'translate-y-0' : 'translate-y-full'
//         }`}>
//         <NewChatContainer users={users} adminProfile={adminProfile} />
//       </div>
//       {!isToggle && showBubbleChat && (
//         <Button
//           variant='ghost'
//           className='p-0 m-0 w-13 h-13'
//           onClick={handleToggleChat}>
//           <MessageCircleMore size={50} className='svg text-blue-600' />
//         </Button>
//       )}
//     </div>
//   );
// };

// export default NewChatWidget;
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { Button, Spinner } from '@/components/ui';
import { useChatStore } from '@/store/use-chat-store';
import { cn, createChatId } from '@/lib/utils';
import { usePresenceStore } from '@/store/use-presence-store';
import NewChatContainer from '@/components/chat/new-chat-container';
import { SafeAdminChat } from '@/types/types';

type NewChatWidgetProps = {
  users: User[] | [];
  adminProfile: SafeAdminChat;
};

const NewChatWidget = ({ users, adminProfile }: NewChatWidgetProps) => {
  const { data: session } = useSession();
  const curUserId = session?.user.id;
  const userRole = session?.user.role;

  const filteredUsersOnly = useMemo(
    () => users.filter((user) => user.role !== 'admin'),
    [users]
  );

  const {
    chatId,
    setChatId,
    setTab,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    chatId: state.chatId,
    setChatId: state.setChatId,
    setTab: state.setTab,
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  const { usersId } = usePresenceStore();

  const activeUsers = useMemo(
    () => filteredUsersOnly.filter((user) => usersId.includes(user.id)),
    [filteredUsersOnly, usersId]
  );

  // Chat initialization effect
  const handleUserChatId = useCallback(() => {
    if (!adminProfile?.id || !curUserId || activeUsers.length === 0)
      return null;
    if (userRole === 'user' && adminProfile?.role === 'admin') {
      const chatId = createChatId(curUserId, adminProfile?.id);
      if (chatId) setChatId(chatId);
      setTab(adminProfile?.id);
    } else if (
      userRole === 'admin' &&
      curUserId === adminProfile?.id &&
      activeUsers[0].role === 'user'
    ) {
      const activeUser = activeUsers[0];
      const chatId = createChatId(adminProfile?.id, activeUser.id);
      if (chatId) setChatId(chatId);
      setTab(activeUser.id);
    }
  }, [
    activeUsers,
    adminProfile?.id,
    adminProfile?.role,
    curUserId,
    setChatId,
    setTab,
    userRole,
  ]);

  useEffect(() => {
    handleUserChatId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsToggle(true);
    setShowBubbleChat(false);
  }, [setIsToggle, setShowBubbleChat]);

  useEffect(() => {
    if (isToggle) {
      setShowBubbleChat(false);
    }
  }, [isToggle, setShowBubbleChat]);

  return (
    <div className='w-13 h-13 m-0 p-0 relative'>
      <div
        className={`fixed bottom-4 right-2 text-shadow-lg transition-transform duration-300 ease-in-out transform ${
          isToggle ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <NewChatContainer users={users} adminProfile={adminProfile} />
      </div>
      {!isToggle && chatId && showBubbleChat ? (
        <Button
          disabled={loading}
          variant='ghost'
          className={cn('p-0 m-0 w-13 h-13', loading && 'cursor-not-allowed')}
          onClick={handleToggleChat}>
          <MessageCircleMore
            size={50}
            className='svg text-blue-600 hover:text-shadow hover:text-500/80 hover:fill-slate-500/20 hover:text-blue-700'
          />
        </Button>
      ) : (
        <Spinner
          size={28}
          className={cn('svg w-16 h-16', isToggle && 'hidden')}
        />
      )}
    </div>
  );
};

export default NewChatWidget;
