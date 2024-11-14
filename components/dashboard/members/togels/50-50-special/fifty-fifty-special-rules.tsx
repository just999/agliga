'use client';

import { cn } from '@/lib/utils';

type FiftyFiftySpecialRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const FiftyFiftySpecialRules = ({
  showDescription,
  setShowDescription,
}: FiftyFiftySpecialRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>
            Kei AsGanjil : -2.0%, AsGenap : -2.0%, AsBesar : -2.0%, AsKecil :
            -2.0%, KopGanjil : -2.0%, KopGenap : -2.0%, KopBesar : -2.0%,
            KopKecil : -2.0%, KepalaGanjil : -2.0%, KepalaGenap : -2.0%,
            KepalaBesar : -2.0%, KepalaKecil : -2.0%, EkorGanjil : -2.0%,
            EkorGenap : -2.0%, EkorBesar : -2.0%, EkorKecil : -2.0%,
          </p>
          <p className='mx-auto '>Hadiah : 1 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>
            Peraturan Game 50-50 Special
          </h2>
          <p>Menebak ganjil/genap, besar/kecil</p>
          <h2>
            Permainan ini sangat menarik karena pasarannya naik turun sesuai
            keinginan market pada waktu tersebut. Dengan demikian, nilai
            pembelian dipengaruhi kei (pasaran)..
          </h2>
          <p>Struktur: ABCD</p>
          <p>Menebak ganjil/genap dan besar/kecil dari posisi:</p>
          <p>A=AS</p>
          <p>B=KOP</p>
          <p>C=KEPALA</p>
          <p>D=EKOR</p>
          <p>Besar/Kecil: 0-4=kecil, 5-9=besar</p>
          <p>Ganjil/Genap : 1=ganjil, 2=genap dan seterusnya</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 4327</p>
          <p>Berarti pemenang adalah yang memilih:</p>
          <p>AS GENAP/KECIL</p>
          <p>KOP GANJIL/KECIL</p>
          <p>KEPALA GENAP/KECIL</p>
          <p>EKOR GANJIL/BESAR</p>
          <p>
            Misal anda membeli dengan dana Rp.100rb untuk AS Genap, menang =
            100rb + [indeks pasaran AS Genap 50-50]
          </p>
          <p>Atau:</p>
          <p>
            Jika membeli dengan dana Rp.100rb untuk Ekor Ganjil, menang = 100rb
            + [indeks pasaran Ekor Ganjil 50-50]
          </p>
          <p>Atau:</p>
          <p>
            Jika membeli dengan dana Rp.100rb untuk AS Ganjil, kalah = 100rb +
            [indeks pasaran AS Ganjil 50-50]
          </p>
        </div>
      </div>
    </div>
  );
};

export default FiftyFiftySpecialRules;
