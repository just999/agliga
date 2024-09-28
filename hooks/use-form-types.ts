import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ImageSlider = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type FormTypeState = {
  formType:
    | 'add-slider'
    | 'edit-slider'
    | 'delete-slider'
    | 'post'
    | 'edit'
    | 'delete-post'
    | 'new-fixture'
    | 'edit-fixture'
    | 'delete-fixture'
    | null;
  isOn: boolean;
  id?: string | null;
  img?: ImageSlider;
  title?: string;
  setOn: (
    type:
      | 'add-slider'
      | 'edit-slider'
      | 'delete-slider'
      | 'post'
      | 'edit'
      | 'delete-post'
      | 'new-fixture'
      | 'edit-fixture'
      | 'delete-fixture',
    id?: string | null,
    title?: string,
    img?: ImageSlider | undefined
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
      setOn: (
        type:
          | 'add-slider'
          | 'edit-slider'
          | 'delete-slider'
          | 'post'
          | 'edit'
          | 'delete-post'
          | 'new-fixture'
          | 'edit-fixture'
          | 'delete-fixture',
        id = null,
        title,
        img
      ) => set({ formType: type, isOn: true, id, title, img }),
      setOff: () =>
        set({
          formType: null,
          isOn: false,
          img: undefined,
          title: undefined,
          id: null,
        }),
      setImg: (type: 'edit-slider' | 'delete-slider', img) =>
        set({ formType: type, img }), // Correctly update the 'img' state
    }),
    { name: 'FormTypeStore' }
  )
);

export default useFormTypes;
