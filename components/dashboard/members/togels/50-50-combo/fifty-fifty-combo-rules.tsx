'use client';

import { cn } from '@/lib/utils';

type FiftyFiftyComboRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const FiftyFiftyComboRules = ({
  showDescription,
  setShowDescription,
}: FiftyFiftyComboRulesProps) => {
  return (
    <div
      className={cn(
        'transform overflow-hidden rounded-sm bg-amber-100 transition-all duration-1000 ease-in-out',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className='mx-auto flex justify-start border border-zinc-300 bg-stone-100 shadow-inner'>
        <div className='px-2 py-1 text-xs'>
          <p className='mx-auto'>
            Kei BelakangMono : -2%, BelakangStereo : -2%, BelakangKembang : -2%,
            BelakangKempis : -2%, BelakangKembar : 43%, TengahMono : -2%,
            TengahStereo : -2%, TengahKembang : -2%, TengahKempis : -2%,
            TengahKembar : 43%, DepanMono : -2%, DepanStereo : -2%, DepanKembang
            : -2%, DepanKempis : -2%, DepanKembar : 43%,
          </p>
          <p className='mx-auto'>Hadiah : 1 x + Modal</p>
          <p className='mx-auto'>Min BET : 5,000</p>
          <p className='mx-auto'>Max BET : 10,000,000</p>
        </div>
      </div>

      <div className='px-2 py-1'>
        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>SILANG HOMO</h2>
          <p>Menebak dari posisi Depan,Tengah,Belakang.</p>
          <p>Contoh no 1234</p>
          <p>Yang dimaksud dengan Posisi Depan adalah 2 no terdepan yaitu 12</p>
          <p>
            Yang dimaksud dengan Posisi Tengah adalah 2 no ditengah yaitu 23
          </p>
          <p>
            Yang dimaksud dengan Posisi Belakang adalah 2 no terbelakang yaitu
            34
          </p>
          <p>SILANG = Terdapat Ganjil dan Genap</p>
          <p>HOMO = Terdapat 1 pasang Ganjil atau 1 pasang Genap</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis I: Beli Posisi Depan
          </h2>
          <p>Keluar : 4321.</p>
          <p>Yang menjadi pedoman adalah posisi Depan, berarti 12</p>
          <p>{`12 => 1=ganjil dan 2=genap , berarti hasil = SILANG`}</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis II: Beli Posisi Tengah
          </h2>
          <p>Keluar : 4326.</p>
          <p>Yang menjadi pedoman adalah posisi Tengah, berarti 32</p>
          <p>{`32 => 3=ganjil dan 2=genap , berarti hasil = SILANG`}</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis III: Beli Posisi Belakang
          </h2>
          <p>Keluar : 4533.</p>
          <p>Yang menjadi pedoman adalah posisi Belakang, berarti 33</p>
          <p>{`33 => 3=ganjil dan 3=ganjil , berarti hasil = HOMO`}</p>
          <p>
            Jika dilakukan pembelian dengan 100rb dan menang maka: Menang =
            100rb + [Indeks kemenangan untuk SILANG HOMO]
          </p>
        </div>
      </div>

      <div className='px-2 py-1'>
        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>KEMBANG KEMPIS KEMBAR</h2>
          <p>Struktur=ABCD</p>
          <p>Jika Menebang posisi Depan maka yang menjadi fokus adalah AB</p>
          <p>Jika Menebang posisi Tengah maka yang menjadi fokus adalah BC</p>
          <p>Jika Menebang posisi Belakang maka yang menjadi fokus adalah CD</p>
          <p>{` KEMBANG jika A < B ataupun B < C ataupun C < D `}</p>
          <p>{` KEMPIS jika A > B ataupun B > C ataupun C > D `}</p>
          <p>KEMBAR jika A = B ataupun B = C ataupun C = D</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis I: Beli Posisi Depan
          </h2>
          <p>Keluar : 4321.</p>
          <p>Yang menjadi pedoman adalah posisi Depan, berarti 43</p>
          <p>{`43 => 4 > 3, hasil = KEMPIS`}</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis II: Beli Posisi Tengah
          </h2>
          <p>Keluar : 4236</p>
          <p>Yang menjadi pedoman adalah posisi Tengah, berarti 23</p>
          <p>{`23 => 2 < 3, hasil = KEMBANG`}</p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>
            Analisis III : Beli Posisi Belakang:
          </h2>
          <p>Keluar : 4099</p>
          <p>Yang menjadi pedoman adalah posisi Belakang, berarti 99</p>
          <p>{`99 => Hasil = KEMBAR`}</p>
          <p>Jika dilakukan pembelian dengan 100rb dan menang maka:</p>
          <p>Menang = 100rb + [Indeks kemenangan untuk KEMBANG-KEMPIS]</p>
        </div>
      </div>
    </div>
  );
};

export default FiftyFiftyComboRules;
