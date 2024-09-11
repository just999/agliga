import { getDepos } from '@/actions/member-actions';
import DepoClient from './depo-client';

import { fetchUsers } from '@/lib/queries/users';
import { cn } from '@/lib/utils';

type DepositPageProps = {};

const DepositPage = async () => {
  const depos = (await getDepos()) || [];
  const users = (await fetchUsers()) || [];
  return <DepoClient depos={depos} users={users} className={cn('hidden')} />;
};

export default DepositPage;
