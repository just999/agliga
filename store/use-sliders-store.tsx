import { SliderFormProps } from '@/app/dashboard/admin/sliders/slider-form';
import { Slider } from '@prisma/client';
import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

type SliderState = {
  img: SliderFormProps[] | [];
  setImg: (img: SliderFormProps[]) => void;
};

const useSlidersStore = create<SliderState>()(
  devtools(
    (set) => ({
      img: [],
      setImg: (img: SliderFormProps[]) => set(() => ({ img })),
    }),
    { name: 'SliderStore' }
  )
);

export default useSlidersStore;
