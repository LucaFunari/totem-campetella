import { PageData } from "./FirstLevel";

export const homePageData: PageData = {
  title: "homepage",
  bgImgPath: "/asset/sfondi/DJI_0110_MOD.jpg",
  isHomePage: true,
  links: [
    { goTo: "iniezione", title: "iniezione" },
    { goTo: "estrusione", title: "estrusione", disabled: false },
    { goTo: "service", title: "service" },
    {
      goTo: "educamp",
      title: "educamp",
      disabled: true,
      icon: "/asset/Educamp logo.svg",
    },
  ],
  specialLink: { goTo: "azienda", title: "l'azienda" },
};

export const estrusioneData: PageData = {
  title: "estrusione",
  bgImgPath: "/asset/sfondi/A016_07040820_C013.braw.08_20_46_34-2.jpg",

  isHomePage: false,
  links: [
    { goTo: "avvolgitori", title: "avvolgitori", disabled: false },
    { goTo: "fine-linea", title: "fine linea", disabled: false },
  ],
};

export const iniezioneData: PageData = {
  title: "iniezione",
  bgImgPath: "/asset/sfondi/271020_HP3D_CAMPETELLA_0002.jpg",
  isHomePage: false,
  links: [
    { goTo: "campi-applicativi", title: "campi applicativi" },
    { goTo: "robot", title: "robot" },
  ],
};
