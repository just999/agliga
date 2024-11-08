import ColokMacauTable from '@/components/dashboard/members/togels/colok-macau/colok-macau-table';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ColokMacauPageProps = {
  params: {
    slug: string;
  };
};

const ColokMacauPage = async ({ params }: ColokMacauPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Macau
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <ColokMacauTable />
      </div>
    </div>
  );
};

export default ColokMacauPage;
