import { cn } from '@/lib/utils';
import WdClient from './wd-client';
import { fetchUsers } from '@/actions/user-actions';
import { getWds } from '@/actions/member-actions';

type WdPageProps = {};

const WdPage = async () => {
  const wds = (await getWds()) || [];
  const users = (await fetchUsers()) || [];

  return <WdClient wds={wds} users={users} className={cn('hidden')} />;
};

export default WdPage;
