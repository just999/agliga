import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatStoreState {
  senderId: string | null;
  recipientId: string | null;
  isToggle: boolean;
  toggleStartChat: boolean;
  toggleSidePanel: boolean;
  showBubbleChat: boolean;
  chatId: string | null;
  anoId: string | null;
  tab: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTab: (tab: string) => void;
  setSenderId: (senderId: string) => void;
  setRecipientId: (recipientId: string) => void;
  setChatId: (chatId: string) => void;
  setAnoId: (anoId: string) => void;
  setIsToggle: (isToggle: boolean) => void;
  setToggleStartChat: (toggleStartChat: boolean) => void;
  setToggleSidePanel: (toggleSidePanel: boolean) => void;
  setShowBubbleChat: (showBubbleChat: boolean) => void;
  closeChat: () => void;
  openChat: () => void;
}

export const useChatStore = create<ChatStoreState>()(
  devtools(
    (set) => ({
      senderId: null,
      recipientId: null,
      isToggle: false,
      toggleStartChat: false,
      toggleSidePanel: true,
      showBubbleChat: true,
      chatId: null,
      anoId: null,
      tab: '',
      loading: false,
      setLoading: (loading) => set({ loading }),
      setTab: (tab) => set({ tab }),
      setSenderId: (senderId) => set({ senderId }),
      setRecipientId: (recipientId) => set({ recipientId }),
      setChatId: (chatId) => set({ chatId }),
      setAnoId: (anoId) => set({ anoId }),
      setIsToggle: (isToggle) => set({ isToggle }),
      setToggleStartChat: (toggleStartChat) => set({ toggleStartChat }),
      setToggleSidePanel: (toggleSidePanel) => set({ toggleSidePanel }),
      setShowBubbleChat: (showBubbleChat) => set({ showBubbleChat }),
      closeChat: () => set({ isToggle: false }),
      openChat: () => set({ isToggle: true }),
    }),
    { name: 'ChatStoreDemo' }
  )
);
