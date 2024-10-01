import { auth } from '@/auth';
import DepoWdForm from '@/components/dashboard/depo-wd-form';

type MemberWDPageProps = {};

const MemberWDPage = async () => {
  const session = await auth();
  const user = session?.user.curUser;
  return <DepoWdForm user={user} />;
};

export default MemberWDPage;
