import { create } from "zustand";

interface popupStateStoreType {
  isOpen: boolean;
  setOpen: (bool?: boolean) => void;
}

export const usePopupStateStore = create<popupStateStoreType>()((set) => ({
  isOpen: false,
  setOpen: (bool?: boolean) => {
    if (bool) {
      set({ isOpen: bool });
    } else {
      set((state) => ({ isOpen: !state.isOpen }));
    }
  },
}));
