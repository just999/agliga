'use client';

import { cn } from '@/lib/utils';

type ShioRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const ShioRules = ({ showDescription, setShowDescription }: ShioRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 9 %</p>
          <p className='mx-auto '>Hadiah : 9 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Shio</h2>

          <h2>Struktur ABCD</h2>
          <p>
            Menebak SHIO dari posisi 2D, SHIO merupakan 12 lambang kelahiran
            dalam penanggalan China. Dalam permainan ini, setiap lambang
            diwakili dengan satu nomor.
          </p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis :</h2>

          <p>Keluar : 4321</p>
          <p>
            Permainan ini hanya memperhatikan posisi 2D, berarti yang
            dipedomanin = 21
          </p>
          <p>Hasil = 21-12 = 9 (shio disesuaikan dengan tabel diatas)</p>
          <p>catatan: nilai yang dikurangi merupakan kelipatan 12.</p>

          <p>Jika dilakukan pembelian dengan 100rb dan menang maka:</p>
          <p>Menang = 100rb + [Indeks kemenangan untuk SHIO]</p>
        </div>

        <p className='text-xs text-amber-700 '>
          NB: Indeks menang dan diskon dapat dilihat di bagian Peraturan
        </p>
      </div>
    </div>
  );
};

export default ShioRules;
