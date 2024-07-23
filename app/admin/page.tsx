import { auth } from '@/auth';
import Container from '@/components/container';

import DepoWdTabsActive from '@/components/table/depo-wd/depo-wd-tabs-active';

import { fetchDepo, fetchWd } from '@/lib/queries/depo-wd';
import { fetchUsers } from '@/lib/queries/users';

import { tabsAdmin } from '@/types';

type AdminPageProps = {};

const AdminPage = async () => {
  const depos = await fetchDepo();
  if (!depos || depos.length === 0) return [];

  const session = await auth();
  const role = session?.user.curUser.role;

  const wds = await fetchWd();
  if (!wds || wds.length === 0) return [];

  const users = await fetchUsers();
  if (!users || users.length === 0) return [];

  Array.prototype.push.apply(depos, wds);

  return (
    <Container className='grid text-xs w-full max-w-[1440px]'>
      <DepoWdTabsActive
        depo={depos}
        users={users}
        role={role}
        tabsData={tabsAdmin}
      />
    </Container>
  );
};

export default AdminPage;
