import ColokBebasTable from '@/components/dashboard/members/togels/colok-bebas/colok-bebas-table';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ColokBebasPageProps = {
  params: {
    slug: string;
  };
};

const ColokBebasPage = async ({ params }: ColokBebasPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Bebas
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        {/* <ColokBebas slug={params.slug} /> */}
        <ColokBebasTable />
      </div>
    </div>
  );
};

export default ColokBebasPage;
