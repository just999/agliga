import { getUserByUserId } from '@/actions/user-actions';
import CardInnerWrapper from '@/components/card-inner-wrapper';

import { notFound } from 'next/navigation';

const MemberDetailsPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const user = await getUserByUserId(params.userId);
  if (!user) return 'Fuck';

  // return <div>{user.name}</div>;
  return (
    user && (
      <CardInnerWrapper
        header='Profile'
        body={<div>{user.name}</div>}
        className='absolute'
        classNameHeader='text-2xl font-semibold text-secondary text-sky-700'
        contentclassname='bg-rose-200'
        classNameFooter='bg-emerald-100'
        classNameContentFooter='bg-sky-100'
      />
    )
  );
};

export default MemberDetailsPage;
