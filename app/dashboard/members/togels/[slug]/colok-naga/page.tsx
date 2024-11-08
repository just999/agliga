import ColokNagaTable from '@/components/dashboard/members/togels/colok-naga/colok-naga-table';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type ColokNagaPageProps = {
  params: {
    slug: string;
  };
};

const ColokNagaPage = async ({ params }: ColokNagaPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Colok-Naga
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <ColokNagaTable />
      </div>
    </div>
  );
};

export default ColokNagaPage;
