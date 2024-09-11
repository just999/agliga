import EmptyState from '@/components/empty-state';

import Container from '@/components/container';

import { fetchUsers, getAdminUserId } from '@/actions/user-actions';
import { userRole } from '@/lib/auth';

import { fetchCurrentUserLikeIds } from '@/actions/like-actions';
import MemberCard from '@/app/members/member-card';

export const dynamic = 'force-dynamic';

const UsersPage = async () => {
  const adminChatId = '66b5e94e1df1aa252cef500f';
  // const { items: admins, totalCount } = await getAdmins(searchParams);
  const admin = await getAdminUserId(adminChatId);

  const adminArray = admin && Array(admin);
  const likeIds = await fetchCurrentUserLikeIds();

  const users = await fetchUsers();
  const role = await userRole();
  const adminUser = role === 'admin' ? users : adminArray;
  // const unreadMessagesPromises =
  //   adminUser && adminUser.map((user) => getUnreadMessagesBySenderId(user.id));

  // const unreadMessagesArray = await Promise.all(unreadMessagesPromises);
  // const unreadMessages = await getUnreadMessagesBySenderId();

  return (
    <>
      {!admin ? (
        <EmptyState
          title=' There are no results for this filter'
          subtitle=' Please select a different filter'
          link='/users'
        />
      ) : (
        <Container>
          <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
            {role &&
              adminUser?.map((user, i) => (
                <MemberCard likeIds={likeIds} key={user.id} user={user} />
              ))}
          </div>
          {/* <PaginationComponent totalCount={totalCount} /> */}
        </Container>
      )}
    </>
  );
};

export default UsersPage;
