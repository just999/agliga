import ColokJituTable from '@/components/dashboard/members/togels/colok-jitu/colok-jitu-table';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type ColokJituPageProps = {
  params: {
    slug: string;
  };
};

const ColokJituPage = async ({ params }: ColokJituPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Jitu
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <ColokJituTable />
      </div>
    </div>
  );
};

export default ColokJituPage;
