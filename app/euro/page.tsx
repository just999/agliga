'use client';

import Container from '@/components/container';

import Euro from '@/components/euro';

import EuroClient from '@/components/table/euro/euro-client';
import {
  euroGroupA,
  euroGroupB,
  euroGroupC,
  euroGroupD,
  euroGroupE,
  euroGroupF,
} from '@/lib/helper';

type EuroPageProps = {};

const EuroPage = () => {
  return (
    <>
      <Container className='flex flex-col mx-auto px-10 bg-stone-100 py-2'>
        <div>
          <Euro />
        </div>
      </Container>
      <Container className='grid md:grid-cols-1 xl:grid-cols-2 gap-4 '>
        <EuroClient data={euroGroupA} group='Group A' />
        <EuroClient data={euroGroupB} group='Group B' />
        <EuroClient data={euroGroupC} group='Group C' />
        <EuroClient data={euroGroupD} group='Group D' />
        <EuroClient data={euroGroupE} group='Group E' />
        <EuroClient data={euroGroupF} group='Group F' />
      </Container>
    </>
  );
};

export default EuroPage;
