import { getUserById } from '@/actions/auth-actions';

import { getMessageThread } from '@/actions/message-actions';

import { createChatId } from '@/lib/utils';

import ClientOnly from '@/lib/client-only';
import ChatContainer from '@/components/chat/chat-container';
import { auth } from '@/auth';
import { fetchUsers } from '@/actions/user-actions';

const ChatDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  const userId = session?.user.id || null;

  const user = await getUserById(params.userId);

  const allUsers = (await fetchUsers()) || [];
  const messages = await getMessageThread(params.userId);
  const chatId = createChatId(userId, params.userId);

  return (
    <ClientOnly>
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
    </ClientOnly>
  );
};

export default ChatDetailsPage;
