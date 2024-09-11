import EmptyState from '@/components/empty-state';
import { GetUserParams } from '@/types';
import Container from '@/components/container';
import { getAllAdmins } from '@/actions/admin-actions';

import { getAllUser } from '@/actions/user-actions';
import { getUserRole } from '@/actions/auth-actions';
import AdminChatBubble from '@/components/chat/admin-chat-bubble';
import { auth } from '@/auth';

const ChatPage = async ({ searchParams }: { searchParams: GetUserParams }) => {
  const session = await auth();
  const userId = session?.user.id || null;

  const admins = (await getAllAdmins()) || [];

  const users = (await getAllUser()) || [];

  const role = await getUserRole();

  const adminUsers = role === 'admin' ? users : admins;
  return (
    <>
      {!admins || admins.length === 0 ? (
        <EmptyState
          title=' There are no results for this filter'
          subtitle=' Please select a different filter'
          link='/dashboard'
        />
      ) : (
        <Container>
          <div className='mt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
            {role &&
              adminUsers?.map((user) => (
                // <MemberCard likeIds={likeIds} key={user.id} user={user} />
                <AdminChatBubble
                  key={user.id}
                  adminUser={user}
                  senderId={userId}
                  users={users}
                />
              ))}
          </div>
          {/* <PaginationComponent totalCount={totalCount} /> */}
        </Container>
      )}
    </>
  );
};

export default ChatPage;
