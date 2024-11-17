import ColokJituTable from '@/components/dashboard/members/togels/colok-jitu/colok-jitu-table';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ColokJituPageProps = {
  params: {
    slug: string;
  };
};

const ColokJituPage = async ({ params }: ColokJituPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Jitu
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <ColokJituTable />
      </div>
    </TogelContainer>
  );
};

export default ColokJituPage;
