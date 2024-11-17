'use client';

import Bseo from '@/components/dashboard/members/togels/bseo/bseo';
import BseoTest from '@/components/dashboard/members/togels/bseo/bseo-test';
import TogelContainer from '@/components/shadcn/ui/togel-container';
import { capitalizeFirstCharacter, cn, oldStandardTT } from '@/lib/utils';

type BSeoPageProps = {
  params: {
    slug: string;
  };
};

const BSeoPage = ({ params }: BSeoPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}
      >
        {capitalizeFirstCharacter(params.slug)} - Pools -
        Besar-Kecil/Genap-Ganjil
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <BseoTest />
      </div>
    </TogelContainer>
  );
};

export default BSeoPage;
