import { auth } from '@/auth';
import { fetchDepoByUserId, fetchWdByUserId } from '@/lib/queries/depo-wd';

type UsersPageProps = {};

const UsersPage = async () => {
  const session = await auth();
  const id = session?.user.id;
  if (!id) return;
  const userDepos = await fetchDepoByUserId(id);

  if (!userDepos || userDepos.length === 0) return [];

  const userWds = await fetchWdByUserId(id);
  if (!userWds || userWds.length === 0) return [];

  Array.prototype.push.apply(userDepos, userWds);
  console.log('🚀 ~ UsersPage ~ userDepos:', userDepos);

  return <div>UsersPage</div>;
};

export default UsersPage;
