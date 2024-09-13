import { getUserById } from '@/actions/get-user';
import { fetchUsers } from '@/actions/user-actions';
import NewChatWidget from './new-chat-widget';
import { adminChatProfile } from '@/lib/helper';

// export const adminChatId = '66b5e94e1df1aa252cef500f';

const NewWidget = async () => {
  // const adminProfile = await getUserById(adminChatId);
  const allUsers = (await fetchUsers()) || [];
  return <NewChatWidget users={allUsers} adminProfile={adminChatProfile} />;
};

export default NewWidget;
