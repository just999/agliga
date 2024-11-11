import FiftyFiftySpecialTable from '@/components/dashboard/members/togels/50-50-special/fifty-fifty-special-table';
import TogelContainer from '@/components/ui/togel-container';
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
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - 50/50 special
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <FiftyFiftySpecialTable />
      </div>
    </TogelContainer>
  );
};

export default FiftyFiftySpecialPage;
