import FiftyFiftyTable from '@/components/dashboard/members/togels/50-50/fifty-fifty-table';
import FiftyFifty from '@/components/dashboard/members/togels/50-50/fifty-fifty-table';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type FiftyFiftyPageProps = {
  params: {
    slug: string;
  };
};

const FiftyFiftyPage = async ({ params }: FiftyFiftyPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 50 50
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <FiftyFiftyTable />
      </div>
    </div>
  );
};

export default FiftyFiftyPage;
