import { auth } from '@/auth';
import Container from '@/components/container';
import DepoWdTabsActive from '@/components/table/depo-wd/depo-wd-tabs-active';
import { fetchDepoByUserId, fetchWdByUserId } from '@/lib/queries/depo-wd';
import { fetchUsers } from '@/lib/queries/users';
import { tabsMember } from '@/types';
import { redirect } from 'next/navigation';

type UsersPageProps = {};

const UsersPage = async () => {
  const session = await auth();
  const id = session?.user.id;
  const role = session?.user.curUser.role;
  // if (role !== 'user' || role !== 'admin') redirect('/');
  const userDepos = await fetchDepoByUserId(id);
  if (!userDepos || userDepos.length === 0) return [];

  const userWds = await fetchWdByUserId(id);
  if (!userWds || userWds.length === 0) return [];

  const users = await fetchUsers();
  if (!users || users.length === 0) return [];

  Array.prototype.push.apply(userDepos, userWds);
  return (
    <Container className='grid text-xs w-full max-w-[1440px]'>
      {/* <h1 className='w-full'>User depo Page {userDepos.length} </h1>
      <h1 className='w-full'>User wd Page {userWds.length} </h1> */}
      <DepoWdTabsActive
        depo={userDepos}
        users={users}
        role={role}
        tabsData={tabsMember}
      />
    </Container>
  );
};

export default UsersPage;
