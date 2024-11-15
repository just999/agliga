'use client';

import { cn } from '@/lib/utils';

type ColokNagaRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const ColokNagaRules = ({
  showDescription,
  setShowDescription,
}: ColokNagaRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 10%</p>
          <p className='mx-auto '>Hadiah : 20 x | 29 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Colok Naga</h2>
          <p>
            Cara kerja seperti colok bebas 2D / MACAU tapi mesti yang keluar 3
            angka dari 4D.
          </p>

          <p>Struktur: ABCD</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya dibeli 4 ,2 dan 3 dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>karena keluar 3 digit,angka 4,2 dan 3.</p>
          <p>
            100rb + [Indeks kemenangan untuk colok naga , kategori: 3 digit]
          </p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis II:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya dibeli 4,2 dan 6 dengan nilai 100rb.</p>
          <p>Berarti KALAH</p>
          <p>
            karena keluar hanya 2 digit,angka 4 dan 2 .dan angka 6 tidak muncul
          </p>
          <p>nilai betting tidak dikembalikan</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis III:</h2>
          <p>Keluar : 4331</p>
          <p>Misalnya dibeli 4,3 dan 3 dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>karena keluar 3 digit,angka 4,3 dan 3.</p>
          <p>
            100rb + [Indeks kemenangan untuk colok naga , kategori: 3 digit]
          </p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis IV:</h2>
          <p>Keluar : 4334</p>
          <p>Misalnya dibeli 4,3 dan 3 dengan nilai 100rb.</p>
          <p>karena keluar 4 digit,angka 4,3 dan 3.</p>
          <p>Berarti menang:</p>
          <p>100rb + [Indeks kemenangan untuk colok naga, kategori: 4 digit]</p>
        </div>
      </div>
    </div>
  );
};

export default ColokNagaRules;
