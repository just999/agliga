import { auth } from '@/auth';
import Container from '@/components/container';
import DepoWdTabsActive from '@/components/table/depo-wd/depo-wd-tabs-active';
import { fetchDepoByUserId, fetchWdByUserId } from '@/lib/queries/depo-wd';
import { fetchUsers } from '@/lib/queries/users';
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
    <Container className='w-full flex flex-row justify-center mx-auto text-2xl text-blue-600 bg-sky-100'>
      {/* <h1 className='w-full'>User depo Page {userDepos.length} </h1>
      <h1 className='w-full'>User wd Page {userWds.length} </h1> */}
      <DepoWdTabsActive
        depo={userDepos}
        users={role === 'admin' ? users : []}
        role={role}
      />
    </Container>
  );
};

export default UsersPage;
