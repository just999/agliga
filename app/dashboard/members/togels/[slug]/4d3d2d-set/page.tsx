import Togel4dSetTable from '@/components/dashboard/members/togels/4d3d2dSet/togel-4d-set-table';
import Togel4dSet from '@/components/dashboard/members/togels/togel-4d-set';
import TogelTable4dSet from '@/components/dashboard/members/togels/togel-table-4d-set';
import TogelTable4dSetConfirm from '@/components/dashboard/members/togels/togel-table-4d-set-confirm';
import TogelContainer from '@/components/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type Togel4dSetPageProps = {
  params: {
    slug: string;
  };
};

const Togel4dSetPage = async ({ params }: Togel4dSetPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 4d/3d/2d - set
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        {/* <Togel4dSet params={params} /> */}
        <Togel4dSetTable params={params} />
        {/* <TogelTable4dSet params={params} /> */}
        {/* <TogelTable4dSetConfirm params={params} /> */}
      </div>
    </TogelContainer>
  );
};

export default Togel4dSetPage;
