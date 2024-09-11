import { create } from 'zustand';

type ChatState = {
  chatType: 'chat' | null;
  isOpen: boolean;
  userId?: string;
  onOpen: (type: 'chat', userId?: string) => void;
  onClose: () => void;
  setUserId: (type: 'chat', userId: string) => void;
};

const useModalChat = create<ChatState>((set) => ({
  chatType: null,
  isOpen: false,
  userId: undefined,
  onOpen: (type: 'chat', userId) =>
    set({ chatType: type, isOpen: true, userId }),
  onClose: () =>
    set({
      chatType: null,
      isOpen: false,
      userId: undefined,
    }),
  setUserId: (type: 'chat', userId) => set({ chatType: type, userId }),
}));

export default useModalChat;
