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
    <ClientOnly>
      <div className='py-2 '>{user && <MemberDepoForm user={user} />}</div>
    </ClientOnly>
  );
};

export default MemberDepoDetailPage;
