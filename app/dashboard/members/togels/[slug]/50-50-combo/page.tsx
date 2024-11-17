import FiftyFiftyComboTable from '@/components/dashboard/members/togels/50-50-combo/fifty-fifty-combo-table';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type FiftyFiftyComboPageProps = {
  params: {
    slug: string;
  };
};

const FiftyFiftyComboPage = async ({ params }: FiftyFiftyComboPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - 50/50 kombinasi
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <FiftyFiftyComboTable />
      </div>
    </TogelContainer>
  );
};

export default FiftyFiftyComboPage;
