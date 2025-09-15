import { PageData } from "./FirstLevel";

export const homePageData: PageData = {
  title: "homepage",
  titleKey: 'home',
  bgImgPath: "./asset/sfondi/DJI_0110_MOD.jpg",
  bgImgKey: "home-sfondo",
  isHomePage: true,
  links: [
    { goTo: "iniezione", title: "iniezione", key: "home_cta_iniezione" },
    { goTo: "estrusione", title: "estrusione", key: "home_cta_estrusione" },
    { goTo: "service", title: "service", key: "home_cta_service" },
    {
      goTo: "educamp",
      title: "educamp",
      icon: "./asset/Educamp logo.svg",
      key: null,
    },
    {
      goTo: "dashboard",
      title: "dashboard",
      key: null,
    },
  ],
  specialLink: { goTo: "azienda", title: "l'azienda", key: "home_cta_azienda" },
};

export const estrusioneData: PageData = {
  title: "estrusione",
  titleKey: "home_cta_estrusione",
  bgImgPath: "./asset/sfondi/A016_07040820_C013.braw.08_20_46_34-2.jpg",
  bgImgKey: "estrusione_sfondo",
  isHomePage: false,
  links: [
    {
      goTo: "avvolgitori",
      title: "avvolgitori",
      disabled: false,
      key: "estrusione_titolo_avvolgitori",
    },
    {
      goTo: "fine-linea",
      title: "fine linea",
      disabled: false,
      key: "estrusione_titolo_finelinea",
    },
  ],
};

export const iniezioneData: PageData = {
  title: "iniezione",
  titleKey: "home_cta_iniezione",
  bgImgKey: "iniezione_sfondo",
  bgImgPath: "./asset/sfondi/271020_HP3D_CAMPETELLA_0002.jpg",
  isHomePage: false,
  links: [
    {
      goTo: "campi-applicativi",
      title: "campi applicativi",
      key: "iniezione_titoli_campi_applicativi",
    },
    { goTo: "robot", title: "robot", key: "iniezione_titolo_robot" },
  ],
};
