import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LiveChatStoreState {
  senderId: string | null;
  recipientId: string | null; // Consider removing, derive from chatId
  isChatOpen: boolean;
  showBubbleChat: boolean;
  chatId: string | null; // Combine tab into this
  loading: boolean;

  setLoading: (loading: boolean) => void;
  setChatId: (chatId: string) => void;
  toggleChat: (isChatOpen: boolean) => void; // Combine openChat and closeChat
  setShowBubbleChat: (showBubbleChat: boolean) => void;
}

export const useLiveChatStore = create<LiveChatStoreState>()(
  devtools(
    (set) => ({
      senderId: null,
      recipientId: null, // Potentially remove
      isChatOpen: false,
      showBubbleChat: true,
      chatId: null,
      loading: false,

      setLoading: (loading) => set({ loading }),
      setChatId: (chatId) => set({ chatId }),
      toggleChat: (isChatOpen) => set({ isChatOpen: !isChatOpen }),
      setShowBubbleChat: (showBubbleChat) => set({ showBubbleChat }),
    }),
    { name: 'ChatStoreDemo' }
  )
);
