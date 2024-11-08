import ShioTable from '@/components/dashboard/members/togels/shio/shio-table';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type ShioPageProps = {
  params: {
    slug: string;
  };
};

const ShioPage = async ({ params }: ShioPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Shio
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <ShioTable />
      </div>
    </div>
  );
};

export default ShioPage;
