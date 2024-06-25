import { create } from 'zustand';

// export const imageSlider = {
//   images: '',
//   userId: '',
// };

export type ImageSlider = {
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
    | 'delete-post'
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
    | 'delete-slider'
    | 'fixture'
    | 'new-euro'
    | 'edit-euro'
    | 'new-fixture'
    | 'edit-fixture'
    | 'delete-fixture'
    | 'delete-euro'
    | 'deleteSchedule'
    | null;
  isOpen: boolean;
  id?: string | null;
  title?: string | undefined;
  isToggle: boolean;
  img?: ImageSlider;
  group?: string;
  period?: string;
  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'wd'
      | 'post'
      | 'edit'
      | 'delete-post'
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
      | 'delete-slider'
      | 'fixture'
      | 'new-euro'
      | 'edit-euro'
      | 'new-fixture'
      | 'edit-fixture'
      | 'delete-fixture'
      | 'delete-euro'
      | 'deleteSchedule',
    id?: string | null,
    title?: string | undefined,
    img?: ImageSlider | undefined,
    group?: string | undefined,
    period?: string | undefined
  ) => void;
  onClose: () => void;
  toggle: (isToggle: boolean, group?: string) => void;
  setImg: (type: 'edit-slider', img: ImageSlider) => void;
  setGroup: (
    type:
      | 'new-euro'
      | 'edit-euro'
      | 'delete-euro'
      | 'new-fixture'
      | 'edit-fixture'
      | 'delete-fixture',
    isOpen?: boolean,
    group?: string,
    period?: string
  ) => void;
  // authModal: () => void;
};

const useModal = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  id: null,
  title: undefined,
  isToggle: false,
  img: undefined,
  group: undefined,
  period: undefined,
  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'wd'
      | 'post'
      | 'edit'
      | 'delete-post'
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
      | 'delete-slider'
      | 'fixture'
      | 'new-euro'
      | 'edit-euro'
      | 'new-fixture'
      | 'edit-fixture'
      | 'delete-fixture'
      | 'delete-euro'
      | 'editSoccer',
    id = null,
    title,
    img,
    group,
    period
  ) => set({ modalType: type, isOpen: true, id, title, img, group, period }),
  onClose: () =>
    set({
      modalType: null,
      isOpen: false,
      id: null,
      title: undefined,
      img: undefined,
      group: undefined,
      period: undefined,
    }),
  toggle: (isToggle, group) =>
    set((state) => ({
      isToggle: !state.isToggle,
      group,
    })),
  setImg: (type: 'edit-slider', img) => set({ modalType: type, img }),
  // authModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setGroup: (
    type:
      | 'new-euro'
      | 'edit-euro'
      | 'delete-euro'
      | 'new-fixture'
      | 'edit-fixture'
      | 'delete-fixture',
    isOpen?: boolean,
    group?: string,
    period?: string
  ) => set({ modalType: type, isOpen, group, period }),
}));

export default useModal;
