import ClientOnly from '@/lib/client-only';
import MemberWDForm from './wd-form';
import user from 'pusher-js/types/src/core/user';
import { getUserByUserId } from '@/actions/user-actions';

type MemberWdDetailPageProps = {
  params: {
    userId: string;
  };
};

const MemberWdDetailPage = async ({ params }: MemberWdDetailPageProps) => {
  const user = await getUserByUserId(params.userId);
  return (
    <ClientOnly>
      <div className='py-2 '>{user && <MemberWDForm user={user} />}</div>
    </ClientOnly>
  );
};

export default MemberWdDetailPage;
