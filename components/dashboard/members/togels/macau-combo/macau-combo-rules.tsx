'use client';

import { cn } from '@/lib/utils';

type MacauComboRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const MacauComboRules = ({
  showDescription,
  setShowDescription,
}: MacauComboRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>Diskon : 5 %</p>
          <p className='mx-auto '>Hadiah : 2.8 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>KOMBINASI</h2>

          <h2>Struktur ABCD</h2>
          <p>AB = DEPAN, BC = TENGAH, CD = BELAKANG</p>
          <p>Besar/Kecil: 0-4=kecil, 5-9=besar</p>
          <p>Ganjil/Genap : 1=ganjil, 2=genap dan seterusnya</p>
          <p>Anda dapat menebak Genap/Ganjil, Besar/Kecil</p>
          <p>dari 2 kombinasi antara DEPAN, TENGAH, BELAKANG</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>
            Analisis : keluar nomor 1845
          </h2>

          <p>Berarti pemenang adalah yang memilih:</p>
          <p>DEPAN Kecil/Genap</p>
          <p>TENGAH Besar/Genap</p>
          <p>BELAKANG Kecil/Ganjil</p>

          <p>Misalnya anda membeli BELAKANG KECIl dan GANJIL seharga 100rb,</p>
          <p>maka menang = 100rb + [indeks kemenangan untuk kombinasi 2]</p>
          <p>atau :</p>
          <p>jika membeli DEPAN KECIL dan GENAP seharga 100rb,</p>
          <p>maka menang = 100rb + [indeks kemenangan untuk kombinasi 2]</p>
          <p>atau :</p>
          <p>
            jika membeli TENGAH KECIL dan GENAP seharga 100rb, berarti KALAH
          </p>
          <p>
            ( Anda harus menebak keduanya dengan Benar diantara
            DEPAN,TENGAH,BELAKANG agar Menang )
          </p>
        </div>
      </div>
    </div>
  );
};

export default MacauComboRules;
