import DasarTable from '@/components/dashboard/members/togels/dasar/dasar-table';
import TogelContainer from '@/components/ui/togel-container';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type DasarPageProps = {
  params: {
    slug: string;
  };
};

const DasarPage = async ({ params }: DasarPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Dasar
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        <DasarTable />
      </div>
    </TogelContainer>
  );
};

export default DasarPage;
