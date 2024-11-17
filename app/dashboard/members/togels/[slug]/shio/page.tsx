import ShioTable from '@/components/dashboard/members/togels/shio/shio-table';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ShioPageProps = {
  params: {
    slug: string;
  };
};

const ShioPage = async ({ params }: ShioPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - Shio
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <ShioTable />
      </div>
    </TogelContainer>
  );
};

export default ShioPage;
