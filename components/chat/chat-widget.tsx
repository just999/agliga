import { fetchUsers, getUserById } from '@/actions/user-actions';

import AdminChatBubble from './admin-chat-bubble';

const ChatWidget = async () => {
  const adminChatId = '66b5e94e1df1aa252cef500f';

  const adminProfile = await getUserById(adminChatId);

  const allUsers = (await fetchUsers()) || [];

  // return <ChatBubble users={allUsers} adminProfile={adminProfile} />;
  return <AdminChatBubble users={allUsers} adminProfile={adminProfile} />;
};

export default ChatWidget;
