import { create } from 'zustand';

interface ToggleState {
  isOpen: boolean;
  run?: number | null;
  setRun: (run: number | null) => void;
  setIsOpen: (isOpen: boolean, run?: number) => void;
  toggle: (isOpen: boolean, run?: number) => void;
}

const useRunToggleStore = create<ToggleState>((set) => ({
  isOpen: false,
  run: null,
  setRun: (run: number | null) => set(() => ({ run })),
  setIsOpen: (isOpen: boolean, run?: number) => {
    set((state) => ({
      ...state,
      isOpen: true,
      run: isOpen ? run : state.run, // Set run only when opening
    }));

    // Handle closing other toggles (assuming a unique run identifier)
    if (!isOpen) {
      set({ isOpen: false, run: null }); // Close other open toggles
    }
  },
  toggle: (isOpen: boolean, run?: number) =>
    set((state) => ({
      isOpen: !isOpen,
      run,
      // run: state.isOpen ? run : state.run,
    })),
}));

export default useRunToggleStore;
