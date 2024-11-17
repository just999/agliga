import ColokBebasTable from '@/components/dashboard/members/togels/colok-bebas/colok-bebas-table';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ColokBebasPageProps = {
  params: {
    slug: string;
  };
};

const ColokBebasPage = async ({ params }: ColokBebasPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Bebas
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <ColokBebasTable />
      </div>
    </TogelContainer>
  );
};

export default ColokBebasPage;
