'use client';

import { useCallback, useEffect } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui';
import { useChatStore } from '@/store/use-chat-store';
import { createChatId } from '@/lib/utils';
import { usePresenceStore } from '@/store/use-presence-store';
import NewChatContainer from '@/components/chat/new-chat-container';

type NewChatWidgetProps = {
  users: User[] | [];
  adminProfile: User | null;
};

const NewChatWidget = ({ users, adminProfile }: NewChatWidgetProps) => {
  const { data: session } = useSession();
  const curUserId = session?.user.id;

  const currentUser = session?.user.curUser;

  const userRole = session?.user.role;

  const {
    senderId,
    recipientId,
    setSenderId,
    setRecipientId,
    chatId,
    tab,
    setTab,
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
    tab: state.tab,
    setChatId: state.setChatId,
    setTab: state.setTab,
    setRecipientId: state.setRecipientId,
    setIsToggle: state.setIsToggle,
    setShowBubbleChat: state.setShowBubbleChat,
    isToggle: state.isToggle,
    setToggleSidePanel: state.setToggleSidePanel,
    toggleSidePanel: state.toggleSidePanel,
    showBubbleChat: state.showBubbleChat,
  }));
  // const chatId =
  //   userRole === 'user' &&
  //   adminProfile?.id &&
  //   createChatId(curUserId, adminProfile?.id);

  const { usersId } = usePresenceStore();

  useEffect(() => {
    if (usersId && users) {
      users
        .filter((user) => usersId.includes(user.id))
        .map((u) => {
          if (userRole === 'user' && adminProfile?.id) {
            const chatId = createChatId(curUserId, adminProfile?.id);
            if (chatId) setChatId(chatId);
            setTab(adminProfile?.id);
          } else if (userRole === 'admin' && adminProfile?.id) {
            const chatId = createChatId(adminProfile?.id, u.id);
            if (chatId) setChatId(chatId);
            setTab(u.id);
          }
        });
    }
  }, [userRole, setChatId, setTab]);

  const handleToggleChat = useCallback(() => {
    setIsToggle(true);
    setShowBubbleChat(false);

    // if (chatId) setChatId(chatId);

    setTimeout(() => {
      setShowBubbleChat(false);
    }, 500);
  }, [setIsToggle, setShowBubbleChat]);
  return (
    <div className='w-13 h-13 m-0 p-0 relative'>
      <div
        className={`fixed bottom-4 right-2 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isToggle ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <NewChatContainer users={users} adminProfile={adminProfile} />
      </div>
      {!isToggle && showBubbleChat && (
        <Button
          variant='ghost'
          className='p-0 m-0 w-13 h-13'
          onClick={handleToggleChat}>
          <MessageCircleMore size={50} className='svg text-blue-600' />
        </Button>
      )}
    </div>
  );
};

export default NewChatWidget;
