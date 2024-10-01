import DepoWdForm from '@/components/dashboard/depo-wd-form';
import MemberDepoForm from './[userId]/depo-form';
import { auth } from '@/auth';

type MemberDepoPageProps = {};

const MemberDepoPage = async () => {
  const session = await auth();
  const user = session?.user.curUser;

  return <DepoWdForm user={user} />;
};

export default MemberDepoPage;
