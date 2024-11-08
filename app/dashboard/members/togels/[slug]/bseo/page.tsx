'use client';

import Bseo from '@/components/dashboard/members/togels/bseo/bseo';
import BseoTest from '@/components/dashboard/members/togels/bseo/bseo-test';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type BSeoPageProps = {
  params: {
    slug: string;
  };
};

const BSeoPage = ({ params }: BSeoPageProps) => {
  return (
    <div className='bg-orange-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools -
        Besar-Kecil/Genap-Ganjil
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <BseoTest />
      </div>
    </div>
  );
};

export default BSeoPage;
