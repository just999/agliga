'use client';

import { cn } from '@/lib/utils';

type FiftyFiftyRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const FiftyFiftyRules = ({
  showDescription,
  setShowDescription,
}: FiftyFiftyRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>
            Kei Besar : -1.5%, Kecil : -1.5%, Genap : -1.5%, Ganjil : -1.5%,
            Tengah : -1.5%, Tepi : -1.5%,
          </p>
          <p className='mx-auto '>Hadiah : 1 x + Modal</p>
          <p className='mx-auto '>Min BET : 5,000</p>
          <p className='mx-auto '>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>50-50</h2>
          <p>Permainan ganjil/genap, besar/kecil, dan tengah/ tepi UMUM</p>
          <h2>Struktur: CD ( hanya dua angka belakang yang dihitung)</h2>
          <p>Menebak ganjil/genap dan besar/kecil dari posisi:</p>
          <p>C=KEPALA</p>
          <p>D=EKOR</p>
          <p>Besar/Kecil: 0-4=kecil, 5-9=besar</p>
          <p>Ganjil/Genap : 1=ganjil, 2=genap dan seterusnya</p>
          <p>
            Tengah/Tepi : Tengah: angka 25 s/d 74. TEPI : angka 75 s/d 99, dan
            00s/d 24
          </p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>Analisis I:</h2>
          <p>Keluar : 6789, Berarti hasil 89</p>
          <p>Berarti pemenang adalah yang memilih:</p>
          <p>BESAR</p>
          <p>GANJIL</p>
          <p>TEPI</p>
        </div>
      </div>
    </div>
  );
};

export default FiftyFiftyRules;
