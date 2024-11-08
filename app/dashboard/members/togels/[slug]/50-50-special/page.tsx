import FiftyFiftySpecialTable from '@/components/dashboard/members/togels/50-50-special/fifty-fifty-special-table';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type FiftyFiftySpecialPageProps = {
  params: {
    slug: string;
  };
};

const FiftyFiftySpecialPage = async ({
  params,
}: FiftyFiftySpecialPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 50/50 special
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <FiftyFiftySpecialTable />
      </div>
    </div>
  );
};

export default FiftyFiftySpecialPage;
