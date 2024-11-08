import Bbfs from '@/components/dashboard/members/togels/bbfs/bbfs';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';
import dynamic from 'next/dynamic';

const BbDynamic = dynamic(
  () => import('@/components/dashboard/members/togels/bbfs'),
  {
    ssr: false,
  }
);

type BolakBalikPageProps = {
  params: {
    slug: string;
  };
};

const BolakBalikPage = async ({ params }: BolakBalikPageProps) => {
  return (
    <div className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools - Bolak-Balik-Full-Set
      </div>
      <div className='bg-green-50/50 px-2 py-1 rounded-lg shadow-lg'>
        {/* <Togel4dSet params={params} /> */}
        {/* <TogelTableBbfs params={params} /> */}
        {/* <BbDynamic params={params} /> */}
        <Bbfs params={params} />
        {/* <TogelTable4dSetConfirm params={params} /> */}
      </div>
    </div>
  );
};

export default BolakBalikPage;
