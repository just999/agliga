import React from 'react';
import { getMessageThread } from '@/actions/message-actions';

import { getUserById } from '@/actions/auth-actions';

import { createChatId } from '@/lib/utils';

import ChatContainer from '@/components/chat/chat-container';
import { auth } from '@/auth';
import { fetchUsers } from '@/actions/user-actions';

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const userId = session?.user.id || null;

  const messages = await getMessageThread(params.userId);
  const user = await getUserById(params.userId);
  // if (!messages) return [];
  // const isCurrentUserSender = messages?.messages[0]?.senderId === userId;

  // const user = await getUserByUserId(params.userId);
  // const admin = await getAdminUserId(params.userId);

  // const role = await userRole();

  // const avatar = isCurrentUserSender
  //   ? messages.messages[0].recipientImage || '/img/user.svg'
  //   : messages.messages[0].senderImage || '/img/user.svg';

  // const username = isCurrentUserSender
  //   ? messages.messages[0].recipientName
  //   : messages.messages[0].senderName;

  // const adminUser = role === 'admin' ? user : admin;

  const allUsers = (await fetchUsers()) || [];

  const chatId = createChatId(userId, params.userId);

  return (
    <>
      {user && (
        <ChatContainer
          avatar={user?.image}
          initialMessages={messages}
          username={user?.name}
          chatId={chatId}
          userId={userId}
          rUser={user}
          users={allUsers}
        />
      )}
    </>
  );
};

export default ChatPage;
