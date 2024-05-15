import { create } from 'zustand';

interface ToggleState {
  isOpen: boolean;
  run?: number | null;
  setIsOpen: (isOpen: boolean, run?: number) => void;
  toggle: (run?: number) => void;
}

const useRunToggleStore = create<ToggleState>((set) => ({
  isOpen: false,
  run: null,
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
  toggle: (run?: number) =>
    set((state) => ({
      isOpen: true,
      run,
      // run: state.isOpen ? run : state.run,
    })),
}));

export default useRunToggleStore;
