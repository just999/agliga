import FiftyFiftyComboTable from '@/components/dashboard/members/togels/50-50-combo/fifty-fifty-combo-table';
import MacauComboTable from '@/components/dashboard/members/togels/macau-combo/macau-combo-table';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type MacauComboPageProps = {
  params: {
    slug: string;
  };
};

const MacauComboPage = async ({ params }: MacauComboPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - Macau-kombinasi
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <MacauComboTable />
      </div>
    </TogelContainer>
  );
};

export default MacauComboPage;
