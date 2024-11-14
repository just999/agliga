'use client';

import { cn } from '@/lib/utils';

type DasarRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const DasarRules = ({
  showDescription,
  setShowDescription,
}: DasarRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>
            Kei Ganjil : -25%, Genap : 0%, Besar : -25%, Kecil : 0%,
          </p>
          <p className='mx-auto '>Hadiah : 1 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Dasar</h2>
          <p>
            Menebak ganjil/genap dan besar/kecil dari penjumlah angka-angka 2D.
          </p>
          <p>Nilai pembelian ditentukan pasaran (kei) pada saat itu.</p>
          <h2>Struktur: CD (2 angka terakhir)</h2>
          <p>Kecil = angka 0-4</p>
          <p>Besar = angka 5-9r</p>
          <p>Ganjil = 1,3,5,7,9</p>
          <p>Genap = 0,2,4,6,8</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 1234,</p>
          <p>3+4 = 7</p>
          <p>TENGAH Besar/Genap</p>
          <p>Berarti keluar : Ganjil dan Besar</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis II:</h2>
          <p>Keluar : 5678,</p>
          <p>7+8 = 15</p>
          <p>Karena angka 15 lebih besar dari 9, kembali dihitung 1+5=6</p>
          <p>Berarti keluar : Genap dan Besar</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis III:</h2>
          <p>Keluar : 1204,</p>
          <p>0+4 = 4</p>
          <p>Berarti keluar : Genap dan Kecil</p>
          <p>
            Misal anda membeli dengan Rp.100rb untuk Genap, menang = 100rb +
            [indeks menang untuk Dasar]
          </p>
        </div>

        <p className='text-xs text-amber-700 '>
          NB: Indeks menang dan diskon dapat dilihat di bagian Peraturan
        </p>
      </div>
    </div>
  );
};

export default DasarRules;
