import { getAuthUserId, getUserById } from '@/actions/auth-actions';
import { getMessageThread } from '@/actions/message-actions';

import { createChatId } from '@/lib/utils';

import ChatContainer from './chat-container';
import LiveChat from './live-chat';
import { adminChatProfile } from '@/lib/helper';
import { fetchUsers } from '@/actions/user-actions';

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const userId = await getAuthUserId();
  const messages = await getMessageThread(params.userId);
  const user = await getUserById(params.userId);
  const chatId = createChatId(userId, params.userId);
  const allUsers = (await fetchUsers()) || []; //?fetch users only no admin
  return (
    <div className='fixed w-[352px] h-[570px] right-0 transition-transform duration-300 items-end rounded-t-lg bg-red-400'>
      {/* <ChatContainer
        userId={userId}
        messages={messages}
        user={user}
        chatId={chatId}
      /> */}

      <LiveChat users={allUsers} adminProfile={adminChatProfile} />
    </div>
  );
};

export default ChatPage;
