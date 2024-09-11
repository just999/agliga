// import { create } from 'zustand';

// interface Tab {
//   id: string;
//   userId: string;
//   name: string;
//   value: string;
//   label: string;
//   chatId: string;
//   isOnline: boolean;
//   unreadCount: number;
// }

// interface TabsState {
//   tabs: Tab[];
//   activeTabValue: string;
//   setTabs: (tabs: Tab[]) => void;
//   addTab: (tab: Tab) => void;
//   removeTab: (tabId: string) => void;
//   setActiveTab: (tabValue: string) => void;
//   getActiveChatId: () => string | undefined;
//   updateOnlineStatus: (userId: string, isOnline: boolean) => void;
//   updateUnreadCount: (userId: string, unreadCount: number) => void;
// }

// export const useTabsStore = create<TabsState>((set, get) => ({
//   tabs: [],
//   activeTabValue: '',
//   setTabs: (tabs) =>
//     set({
//       tabs,
//       activeTabValue: tabs.length > 0 ? tabs[0].value : '',
//     }),
//   addTab: (newTab) =>
//     set((state) => {
//       // Check if the tab already exists
//       const tabExists = state.tabs.some((tab) => tab.chatId === newTab.chatId);
//       if (tabExists) {
//         // If the tab already exists, don't add it
//         return state;
//       }
//       // If the tab doesn't exist, add it
//       return {
//         tabs: [...state.tabs, newTab],
//         activeTabValue:
//           state.tabs.length === 0 ? newTab.chatId : state.activeTabValue,
//       };
//     }),
//   removeTab: (tabId) =>
//     set((state) => {
//       const updatedTabs = state.tabs.filter((tab) => tab.id !== tabId);
//       const newActiveTabValue =
//         state.activeTabValue === tabId && updatedTabs.length > 0
//           ? updatedTabs[0].value
//           : state.activeTabValue;
//       return {
//         tabs: updatedTabs,
//         activeTabValue: newActiveTabValue,
//       };
//     }),
//   setActiveTab: (tabValue) => set({ activeTabValue: tabValue }),
//   getActiveChatId: () => {
//     const state = get();
//     const activeTab = state.tabs.find(
//       (tab) => tab.value === state.activeTabValue
//     );
//     return activeTab?.chatId;
//   },
//   updateOnlineStatus: (userId, isOnline) =>
//     set((state) => ({
//       tabs: state.tabs.map((tab) =>
//         tab.userId === userId ? { ...tab, isOnline } : tab
//       ),
//     })),
//   updateUnreadCount: (userId, unreadCount) =>
//     set((state) => ({
//       tabs: state.tabs.map((tab) =>
//         tab.userId === userId ? { ...tab, unreadCount } : tab
//       ),
//     })),
// }));

import { create } from 'zustand';

interface Tab {
  id: number;
  name: string;
  value: string;
  label: string;
  active: boolean;
}

interface TabsState {
  tabs: Tab[];
  tabVal: string;
  setTabs: (tabs: Tab[]) => void;
  setTabVal: (tabVal: string) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  tabs: [],
  tabVal: '',
  setTabs: (tabs) => set({ tabs }),
  setTabVal: (tabVal) =>
    set((state) => {
      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        active: tab.value === tabVal,
      }));
      return { tabVal, tabs: updatedTabs };
    }),
}));
