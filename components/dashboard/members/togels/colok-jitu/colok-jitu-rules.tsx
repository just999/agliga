'use client';

import { cn } from '@/lib/utils';

type ColokJituRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const ColokJituRules = ({
  showDescription,
  setShowDescription,
}: ColokJituRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 6%</p>
          <p className='mx-auto '>Hadiah : 8 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Colok Jitu</h2>
          <p>Menebak satu angka pada posisi tertentu dari 4D.</p>

          <p>Struktur: ABCD</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya dibeli 4 pada posisi AS dengan nilai 100rb.</p>
          <p>Berarti menang:</p>

          <p>100rb + [Indeks kemenangan untuk colok jitu]</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis II:</h2>
          <p>Keluar : 4331</p>
          <p>Misalnya dibeli 3 pada posisi KOP dengan nilai 100rb.</p>
          <p>Berarti menang:</p>
          <p>
            100rb + [Indeks kemenangan untuk colok jitu]. Hasilnya sama dengan
            analisis I karena hanya memperhatikan posisi yang dipasang.
          </p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis III:</h2>
          <p>Keluar : 4331</p>
          <p>Misalnya dibeli 4 pada posisi EKOR dengan nilai 100rb.</p>
          <p>
            Berarti kalah. Biarpun nilai 4 keluar pada posisi AS tapi tidak akan
            mepengaruhi pemilihan di pososi EKOR
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColokJituRules;
