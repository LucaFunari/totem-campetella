export interface SecondLevelPage {
  title?: string;
  description?: string;
  disabled?: boolean;
  titleKey?: string;
}

export const robotPage: SecondLevelPage = {
  title: "robot",
  titleKey: "iniezione_titolo_robot",
};
export const campiApplicativiPage: SecondLevelPage = {
  title: "campi applicativi",
  disabled: true,
  titleKey: "iniezione_titoli_campi_applicativi",
};

export const avvolgitoriPageData: SecondLevelPage = {
  title: undefined,
};
