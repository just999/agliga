'use client';

import { cn } from '@/lib/utils';

type ColokBebasRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const ColokBebasRules = ({
  showDescription,
  setShowDescription,
}: ColokBebasRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 5%</p>
          <p className='mx-auto '>Hadiah : 1.55 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Colok Angka</h2>
          <p>Lebih di kenal COLOK BEBAS</p>
          <h2>
            Menebak salah satu angka dari 4D. Posisi angka bisa dimana saja
          </h2>
          <p>Struktur: ABCD</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 4321</p>
          <p>Misalnya pembelian Angka 3 dengan nilai taruhan 100rb.</p>
          <p>Berarti menang:</p>
          <p>100rb + [Indeks kemenangan untuk colok angka]</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>Analisis II:</h2>
          <p>Keluar : 4331</p>
          <p>Misalnya pembelian Angka 3 dengan nilai taruhan 100rb.</p>
          <p>Berarti menang:</p>
          <p>100rb + ([Indeks kemenangan untuk colok Angka] x 2)</p>
          <p>
            dan seterusnya untuk setiap kembaran yang berhasil ditebak, otomatis
            mendapat kelipatan [Indeks kemenangan untuk colok angka]
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColokBebasRules;
