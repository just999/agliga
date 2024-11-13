'use client';

import { cn } from '@/lib/utils';

type ColokMacauRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const ColokMacauRules = ({
  showDescription,
  setShowDescription,
}: ColokMacauRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 10%</p>
          <p className='mx-auto '>Hadiah : 6 x | 12 x | 18 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Macau / Colok bebas 2D</h2>
          <p>
            Cara kerja seperti colok angka tapi mesti yang keluar 2 angka dari
            4D.
          </p>

          <p>Struktur: ABCD</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya dibeli 4 dan 2 dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>100rb + [Indeks kemenangan untuk Macau, kategori: 2 digit]</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis II:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya dibeli 4 dan 6 dengan nilai 100rb.</p>
          <p>Berarti KALAH dan nilai betting tidak dikembalikan</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis III:</h2>
          <p>Keluar : 4331</p>
          <p>Misalnya dibeli 4 dan 3 dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>100rb + [Indeks kemenangan untuk Macau, kategori: 3 digit]</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis IV:</h2>
          <p>Keluar : 4334</p>
          <p>Misalnya dibeli 4 dan 3 dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>100rb + [Indeks kemenangan untuk Macau, kategori: 4 digit]</p>
        </div>
      </div>
    </div>
  );
};

export default ColokMacauRules;
