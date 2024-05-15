import { create } from 'zustand';

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
    | 'deleteSchedule'
    | null;
  isOpen: boolean;
  id?: string | null;
  title?: string | undefined;
  isToggle: boolean;

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
      | 'deleteSchedule',
    id?: string | null,
    title?: string | undefined
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
      | 'editSoccer',
    id = null,
    title
  ) => set({ modalType: type, isOpen: true, id, title }),
  onClose: () =>
    set({ modalType: null, isOpen: false, id: null, title: undefined }),
  toggle: () => set((state) => ({ isToggle: !state.isToggle })),
  // authModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModal;
