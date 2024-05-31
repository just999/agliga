import { create } from 'zustand';

// export const imageSlider = {
//   images: '',
//   userId: '',
// };

type ImageSlider = {
  id: string;
  images: string;
  userId: string;
  createAt: Date;
  updatedAt: Date;
};

type ModalStore = {
  modalType:
    | 'login'
    | 'register'
    | 'depo'
    | 'wd'
    | 'post'
    | 'edit'
    | 'delete'
    | 'live'
    | 'topic'
    | 'no-user'
    | 'soccer'
    | 'editSoccer'
    | 'profile'
    | 'editProfile'
    | 'validateUser'
    | 'add-slider'
    | 'edit-slider'
    | 'deleteSchedule'
    | null;
  isOpen: boolean;
  id?: string | null;
  title?: string | undefined;
  isToggle: boolean;
  img?: ImageSlider;

  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'wd'
      | 'post'
      | 'edit'
      | 'delete'
      | 'live'
      | 'topic'
      | 'no-user'
      | 'soccer'
      | 'editSoccer'
      | 'profile'
      | 'editProfile'
      | 'validateUser'
      | 'add-slider'
      | 'edit-slider'
      | 'deleteSchedule',
    id?: string | null,
    title?: string | undefined,
    img?: ImageSlider | undefined
  ) => void;
  onClose: () => void;
  toggle: () => void;
  // authModal: () => void;
};

const useModal = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  id: null,
  title: undefined,
  isToggle: false,
  img: undefined,

  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'wd'
      | 'post'
      | 'edit'
      | 'delete'
      | 'live'
      | 'topic'
      | 'no-user'
      | 'soccer'
      | 'deleteSchedule'
      | 'profile'
      | 'editProfile'
      | 'validateUser'
      | 'add-slider'
      | 'edit-slider'
      | 'editSoccer',
    id = null,
    title,
    img
  ) => set({ modalType: type, isOpen: true, id, title, img }),
  onClose: () =>
    set({
      modalType: null,
      isOpen: false,
      id: null,
      title: undefined,
      img: undefined,
    }),
  toggle: () => set((state) => ({ isToggle: !state.isToggle })),
  // authModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModal;
