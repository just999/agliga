'use client';

import { cn } from '@/lib/utils';

type Togel4dRulesProps = {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
};

const Togel4dRules = ({
  showDescription,
  setShowDescription,
}: Togel4dRulesProps) => {
  return (
    <div
      className={cn(
        'bg-amber-100 rounded-sm transition-all duration-1000 ease-in-out transform overflow-hidden',
        showDescription ? 'max-h-[1705px] opacity-100' : 'max-h-0 opacity-0'
      )}>
      <div className='flex justify-start mx-auto bg-stone-100 shadow-inner border border-zinc-300'>
        <div className='text-xs px-2 py-1'>
          <p className='mx-auto '>
            Diskon : 4D= 66% | 3D= 59% | 2D= 29% | 2D Depan= 28% | 2D Tengah=
            28%
          </p>
          <p className='mx-auto '>
            Hadiah : 4D= 3000 x | 3D= 400 x | 2D= 70 x | 2D Depan= 65 x | 2D
            Tengah= 65 x
          </p>
          <p className='mx-auto '>
            Min BET : 4D= 500 | 3D= 500 | 2D= 500 | 2D Depan= 500 | 2D Tengah=
            500
          </p>
          <p className='mx-auto '>
            Max BET : 4D= 5,000 | 3D= 10,000 | 2D= 20,000 | 2D Depan= 20,000| 2D
            Tengah= 20,000
          </p>
        </div>
      </div>

      <div className='px-2 py-1 '>
        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>4D, 3D dan 2D</h2>
          <p>Menebak 4 angka, 3 angka dan 2 angka.</p>
          <h2>Struktur: ABCD</h2>
          <p>Misalnya keluar : 4321</p>
          <p>Berarti pemenang untuk</p>
          <p>4D = 4321</p>
          <p>3D=321</p>
          <p>2D=21</p>
          <p>
            (Khusus untuk 4D,3D dan 2D diberikan diskon tambahan. Diskon akan
            makin besar jika nilai akumulasi betting dalam satu periode makin
            besar)
          </p>
          <p>Berarti kemenangan anda adalah:</p>
          <p>4D = 100rb x [Indeks kemenangan untuk 4D]:</p>
          <p>3D = 100rb x [Indeks kemenangan untuk 3D]</p>
          <p>2D = 100rb x [Indeks kemenangan untuk 2D]</p>
          <p>(Catatan: nilai bet 100rb tidak dikembalikan ke member)</p>
        </div>

        <div className='py-2 text-xs '>
          <h2 className='font-semibold underline'>QUICK BET 2D</h2>
          <p>
            Untuk memudahkan pembelian khusus 2D Depan, 2D Tengah, 2D(Belakang)
            dalam jumlah banyak dengan kombinasi nomor berurutan dan jumlah bet
            yang sama, misalnya:
          </p>
          <p>2D(Belakang) Besar = 50rb ,artinya 2D yang di bet adalah:</p>
          <p>50 = 50rb</p>
          <p>51 = 50rb</p>
          <p>52 = 50rb</p>
          <p>53 = 50rb</p>
          <p>54 = 50rb</p>
          <p>55 = 50rb sampai dengan 99 = 50rb</p>
          <p>
            Jumlah LINE dalam Besar, Kecil, Ganjil, dan Genap adalah selalu 50
            LINE baik 2D Depan, 2D Tengah maupun 2D(Belakang)
          </p>
        </div>

        <div className='py-2 text-xs'>
          <h2 className='font-semibold underline'>2D Posisi</h2>
          <p>Struktur: ABCD</p>
          <p>AB = DEPAN, BC = TENGAH, CD = BELAKANG</p>
          <p>Besar/Kecil: 0-4=kecil, 5-9=besar</p>
          <p>Ganjil/Genap : 1=ganjil, 2=genap dan seterusnya</p>
          <p>Misalnya keluar nomor = 1234</p>
          <p>berati pemenang untuk 2D Depan adalah = 12</p>
          <p>berati pemenang untuk 2D Tengah adalah = 23</p>
          <p>berati pemenang untuk 2D Belakang adalah = 34</p>
        </div>

        <p className='text-xs font-semibold text-orange-700 '>
          NB: Indeks menang dan diskon dapat dilihat di bagian Peraturan
        </p>
      </div>
    </div>
  );
};

export default Togel4dRules;
