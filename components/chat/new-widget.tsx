import { getUserById } from '@/actions/get-user';
import { fetchUsers } from '@/actions/user-actions';
import NewChatWidget from './new-chat-widget';

const NewWidget = async () => {
  const adminChatId = '66b5e94e1df1aa252cef500f';

  const adminProfile = (await getUserById(adminChatId)) || null;

  const allUsers = (await fetchUsers()) || [];
  return <NewChatWidget users={allUsers} adminProfile={adminProfile} />;
};

export default NewWidget;
