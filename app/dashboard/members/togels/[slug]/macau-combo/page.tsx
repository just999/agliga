import FiftyFiftyComboTable from '@/components/dashboard/members/togels/50-50-combo/fifty-fifty-combo-table';
import MacauComboTable from '@/components/dashboard/members/togels/macau-combo/macau-combo-table';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type MacauComboPageProps = {
  params: {
    slug: string;
  };
};

const MacauComboPage = async ({ params }: MacauComboPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Macau-kombinasi
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <MacauComboTable />
      </div>
    </div>
  );
};

export default MacauComboPage;
