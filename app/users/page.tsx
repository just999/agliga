import { auth } from '@/auth';
import { fetchDepoByUserId } from '@/lib/queries/depo-wd';

type UsersPageProps = {};

const UsersPage = async () => {
  const session = await auth();
  const id = session?.user.id;
  if (!id) return;
  const userDepos = await fetchDepoByUserId(id);
  // console.log('🚀 ~ UsersPage ~ userDepos:', userDepos);
  return <div>UsersPage</div>;
};

export default UsersPage;
