import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ImageSlider = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type FormType =
  | 'add-slider'
  | 'edit-slider'
  | 'delete-slider'
  | 'depo'
  | 'edit-depo'
  | 'delete-depo'
  | 'wd'
  | 'edit-wd'
  | 'delete-wd'
  | 'post'
  | 'edit-post'
  | 'delete-post'
  | 'new-fixture'
  | 'edit-fixture'
  | 'delete-fixture'
  | null;

type FormTypeState = {
  formType: FormType;
  isOn: boolean;
  id: string | null;
  img: ImageSlider | undefined;
  title: string | undefined;
  setOn: (
    type: FormType,
    id?: string | null,
    title?: string,
    img?: ImageSlider
  ) => void;
  setOff: () => void;
  setImg: (type: 'edit-slider' | 'delete-slider', img: ImageSlider) => void;
};

const useFormTypes = create<FormTypeState>()(
  devtools(
    (set) => ({
      formType: null,
      isOn: false,
      id: null,
      title: undefined,
      img: undefined,
      setOn: (type, id = null, title, img) =>
        set({ formType: type, isOn: true, id, title, img }),
      setOff: () =>
        set({
          formType: null,
          isOn: false,
          img: undefined,
          title: undefined,
          id: null,
        }),
      setImg: (type, img) => set({ formType: type, img }),
    }),
    { name: 'FormTypeStore' }
  )
);

export default useFormTypes;
