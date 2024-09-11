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

interface detailedPageStoreType {
  title: string;
  setTitle: (title: string) => void;
}

export const useDetailedPageStore = create<detailedPageStoreType>()((set) => ({
  title: "",
  setTitle: (title: string) => set({ title: title }),
}));
