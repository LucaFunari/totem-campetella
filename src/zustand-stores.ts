import { create } from "zustand";
import { AllegatoCampo } from "./components/third-level-pages/Grids/VideoGrid";
import { Allegato } from "./api/queries";

type localizatinStoreType = {
  lang: "en" | "it";
  setLang: (langCode: "en" | "it") => void;
};

export const useLocalizationStore = create<localizatinStoreType>()((set) => ({
  lang: "it",
  setLang: (langCode: "it" | "en") => set({ lang: langCode }),
}));

export interface video {
  id: number;
  title: string;
}

interface popupStateStoreType {
  isOpen: boolean;
  video?: Allegato | AllegatoCampo;
  setVideo: (v: Allegato | AllegatoCampo) => void;
  setOpen: (bool?: boolean) => void;
}

export const usePopupStateStore = create<popupStateStoreType>()((set) => ({
  isOpen: false,
  setVideo: (v: Allegato | AllegatoCampo) => set({ video: v }),
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

  page?: page;
  resetPage: () => void;
  setPage: (page: page) => void;
}

export const useDetailedPageStore = create<detailedPageStoreType>()((set) => ({
  title: "",
  setTitle: (title: string) => set({ title: title }),

  page: undefined,
  resetPage: () => set({ page: undefined }),
  setPage: (page: page) => set({ page: page }),
}));

interface page {
  title: string;
  subtitle?: string;
  description?: string;
  content?: video[];
  children?: {
    icon?: string;
    title: string;
    subtitle?: string;
    description?: string;
    content?: video[];
    id: string;
    products?: product[];
  }[];
}

export interface product {
  id: string;
  title?: string;
  content?: video[];
  img?: string;
  thumbnail?: string;
  description_short?: string;
  description?: string;
  table_path?: string;
}

// export interface gridElement {
//   id: string;
//   description?: string;
//   subtitle?: string;
//   icon?: string;
//   products?: product[];
// }

export type gridElement = {
  id: number;
  name: string;
  icon?: string;
  count?: number;
  slug: string;
};

// export interface RobotType {
//   id: number;
//   count: number;
//   description: string;
//   name: string;
//   slug: string;
//   taxonomy: string;
// }
// >
