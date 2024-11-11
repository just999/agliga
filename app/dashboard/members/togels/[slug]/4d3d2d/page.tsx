import { getTogelSinByUserId } from '@/actions/togel-actions';
import TogelTable from '@/components/dashboard/members/togels/4d3d2d/togel-table';
import TogelContainer from '@/components/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type Togel4dPageProps = {
  params: {
    slug: string;
  };
};

const Togel4dPage = async ({ params }: Togel4dPageProps) => {
  const togel = await getTogelSinByUserId();

  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 4d 3d 2d
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <TogelTable slug={params.slug} />
      </div>
    </TogelContainer>
  );
};

export default Togel4dPage;
