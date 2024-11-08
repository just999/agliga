import { getTogelSinByUserId } from '@/actions/togel-actions';
import TogelTable from '@/components/dashboard/members/togels/4d3d2d/togel-table';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type Togel4dPageProps = {
  params: {
    slug: string;
  };
};

const Togel4dPage = async ({ params }: Togel4dPageProps) => {
  const togel = await getTogelSinByUserId();

  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 4d 3d 2d
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        {/* <TogelSin slug={params.slug} /> */}
        <TogelTable slug={params.slug} />
      </div>
    </div>
  );
};

export default Togel4dPage;
