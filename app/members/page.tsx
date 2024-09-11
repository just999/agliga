import { fetchCurrentUserLikeIds } from '@/actions/like-actions';

import EmptyState from '@/components/empty-state';

import { getAdmins } from '@/actions/admin-actions';
import { GetUserParams } from '@/types';

import MemberCard from './member-card';
import Container from '@/components/container';

import { getAllUser } from '@/actions/user-actions';
import { userRole } from '@/lib/auth';
import { getUnreadMessagesBySenderId } from '@/actions/message-actions';
import ClientOnly from '@/lib/client-only';

const MembersPage = async ({
  searchParams,
}: {
  searchParams: GetUserParams;
}) => {
  const { items: admins, totalCount } = await getAdmins(searchParams);
  const likeIds = await fetchCurrentUserLikeIds();

  const users = (await getAllUser()) || [];
  const role = await userRole();
  const adminUser = role === 'admin' ? users : admins;

  const unreadMessagesPromises = adminUser.map((user) =>
    getUnreadMessagesBySenderId(user.id)
  );

  const unreadMessagesArray = await Promise.all(unreadMessagesPromises);
  // const unreadMessages = await getUnreadMessagesBySenderId();

  return (
    <ClientOnly>
      {!admins || admins.length === 0 ? (
        <EmptyState
          title=' There are no results for this filter'
          subtitle=' Please select a different filter'
          link='/users'
        />
      ) : (
        <Container>
          <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
            {role &&
              adminUser?.map((user) => (
                <MemberCard likeIds={likeIds} key={user.id} user={user} />
              ))}
          </div>
          {/* <PaginationComponent totalCount={totalCount} /> */}
        </Container>
      )}
    </ClientOnly>
  );
};

export default MembersPage;
