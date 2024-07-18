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
