import { set } from 'date-fns';
import { type } from 'os';
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
    | 'edit-depo'
    | 'delete-depo'
    | 'wd'
    | 'edit-wd'
    | 'delete-wd'
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
    | 'new-epl2122'
    | 'new-epl2223'
    | 'new-epl2324'
    | 'new-epl2425'
    | 'edit-epl2122'
    | 'edit-epl2223'
    | 'edit-epl2324'
    | 'edit-epl2425'
    | 'delete-epl2122'
    | 'delete-epl2223'
    | 'delete-epl2324'
    | 'delete-epl2425'
    | 'delete-euro'
    | 'deleteSchedule'
    | 'admin'
    | 'depo-wd-success'
    | 'depo-wd-failed'
    | 'depo-wd-progress'
    | 'depo-wd-error'
    | 'depo-wd-garbage'
    | null;
  isOpen: boolean;
  id?: string | null;
  title?: string | undefined;
  isToggle: boolean;
  img?: ImageSlider;
  group?: string;
  period?: string;
  qRound?: string;
  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'edit-depo'
      | 'delete-depo'
      | 'wd'
      | 'edit-wd'
      | 'delete-wd'
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
      | 'new-epl2122'
      | 'new-epl2223'
      | 'new-epl2324'
      | 'new-epl2425'
      | 'edit-epl2122'
      | 'edit-epl2223'
      | 'edit-epl2324'
      | 'edit-epl2425'
      | 'delete-epl2122'
      | 'delete-epl2223'
      | 'delete-epl2324'
      | 'delete-epl2425'
      | 'delete-euro'
      | 'deleteSchedule'
      | 'admin'
      | 'depo-wd-success'
      | 'depo-wd-failed'
      | 'depo-wd-progress'
      | 'depo-wd-error'
      | 'depo-wd-garbage',
    id?: string | null,
    title?: string | undefined,
    img?: ImageSlider | undefined,
    group?: string | undefined,
    period?: string | undefined,
    qRound?: string | undefined
  ) => void;
  onClose: () => void;
  toggle: (isToggle: boolean, group?: string) => void;
  setImg: (type: 'edit-slider', img: ImageSlider) => void;
  setGroup: (
    type:
      | 'new-euro'
      | 'edit-euro'
      | 'delete-euro'
      | 'edit-depo'
      | 'delete-depo'
      | 'new-fixture'
      | 'edit-fixture'
      | 'new-epl2122'
      | 'new-epl2223'
      | 'new-epl2324'
      | 'new-epl2425'
      | 'edit-epl2122'
      | 'edit-epl2223'
      | 'edit-epl2324'
      | 'edit-epl2425'
      | 'delete-epl2122'
      | 'delete-epl2223'
      | 'delete-epl2324'
      | 'delete-epl2425'
      | 'delete-fixture',
    isOpen?: boolean,
    group?: string,
    period?: string
  ) => void;
  setQRound: (type: 'new-euro' | 'edit-euro', qRound?: string) => void;
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
  qRound: undefined,
  onOpen: (
    type:
      | 'login'
      | 'register'
      | 'depo'
      | 'edit-depo'
      | 'delete-depo'
      | 'wd'
      | 'edit-wd'
      | 'delete-wd'
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
      | 'new-epl2122'
      | 'new-epl2223'
      | 'new-epl2324'
      | 'new-epl2425'
      | 'edit-epl2122'
      | 'edit-epl2223'
      | 'edit-epl2324'
      | 'edit-epl2425'
      | 'delete-epl2122'
      | 'delete-epl2223'
      | 'delete-epl2324'
      | 'delete-epl2425'
      | 'delete-euro'
      | 'admin'
      | 'depo-wd-success'
      | 'depo-wd-failed'
      | 'depo-wd-progress'
      | 'depo-wd-error'
      | 'depo-wd-garbage'
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
      | 'edit-depo'
      | 'delete-depo'
      | 'new-fixture'
      | 'edit-fixture'
      | 'new-epl2122'
      | 'new-epl2223'
      | 'new-epl2324'
      | 'new-epl2425'
      | 'edit-epl2122'
      | 'edit-epl2223'
      | 'edit-epl2324'
      | 'edit-epl2425'
      | 'delete-epl2122'
      | 'delete-epl2223'
      | 'delete-epl2324'
      | 'delete-epl2425'
      | 'delete-fixture',
    isOpen?: boolean,
    group?: string,
    period?: string
  ) => set({ modalType: type, isOpen, group, period }),
  setQRound: (
    type: 'new-euro' | 'edit-euro' | 'delete-euro',
    qRound?: string
  ) => set({ modalType: type, qRound }),
}));

export default useModal;
