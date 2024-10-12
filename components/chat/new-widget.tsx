import { fetchUsers } from '@/actions/user-actions';
import NewChatWidget from './new-chat-widget';
import { adminChatProfile } from '@/lib/helper';

const NewWidget = async () => {
  const allUsers = (await fetchUsers()) || []; //?fetch users only no admin
  return <NewChatWidget users={allUsers} adminProfile={adminChatProfile} />;
};

export default NewWidget;
