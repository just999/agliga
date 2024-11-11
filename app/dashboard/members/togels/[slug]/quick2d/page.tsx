'use client';

import Quick2d from '@/components/dashboard/members/togels/quick2d/quick2d';
import TogelContainer from '@/components/ui/togel-container';
import { cn, oldStandardTT, capitalizeFirstCharacter } from '@/lib/utils';

type Quick2dPageProps = {
  params: {
    slug: string;
  };
};

const Quick2dPage = ({ params }: Quick2dPageProps) => {
  return (
    <TogelContainer className='bg-cyan-100 px-2 py-2 shadow-xl'>
      <div
        className={cn(
          'mx-auto text-center font-semibold text-lg',
          oldStandardTT.className
        )}>
        {capitalizeFirstCharacter(params.slug)} - Pools -
        Besar-Kecil/Genap-Ganjil
      </div>
      <div className='bg-yellow-50/50 px-2 rounded-lg shadow-lg'>
        <Quick2d />
      </div>
    </TogelContainer>
  );
};

export default Quick2dPage;
