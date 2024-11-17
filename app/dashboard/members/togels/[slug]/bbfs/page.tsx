import Bbfs from '@/components/dashboard/members/togels/bbfs/bbfs';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type BolakBalikPageProps = {
  params: {
    slug: string;
  };
};

const BolakBalikPage = async ({ params }: BolakBalikPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools - Bolak-Balik-Full-Set
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg overflow-hidden'>
        <Bbfs params={params} />
      </div>
    </TogelContainer>
  );
};

export default BolakBalikPage;
