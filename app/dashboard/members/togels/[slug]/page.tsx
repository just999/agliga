import { getTogelSinByUserId } from '@/actions/togel-actions';
import TogelData from '@/components/dashboard/members/togels/togel-data';

import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type TogelPageProps = {
  params: {
    slug: string;
  };
};

const TogelPage = async ({ params }: TogelPageProps) => {
  const togel = await getTogelSinByUserId();
  let togelData;
  if (togel.status === 'success') {
    togelData = togel.data;
  } else if (togel.status === 'error') {
    togelData = null;
  }

  return (
    <div className='bg-orange-300 px-2 pb-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools
      </div>
      <div className='bg-yellow-200 px-2 rounded-lg shadow-lg'>
        {togel && <TogelData slug={params.slug} togel={togel} />}
      </div>
    </div>
  );
};

export default TogelPage;
