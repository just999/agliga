import ClientOnly from '@/lib/client-only';
import MemberDepoForm from './depo-form';
import { getUserByUserId } from '@/actions/user-actions';

type MemberDepoDetailPageProps = {
  params: {
    userId: string;
  };
};

const MemberDepoDetailPage = async ({ params }: MemberDepoDetailPageProps) => {
  const user = await getUserByUserId(params.userId);
  return (
    <>
      <div className='py-2 '>{user && <MemberDepoForm user={user} />}</div>
    </>
  );
};

export default MemberDepoDetailPage;
