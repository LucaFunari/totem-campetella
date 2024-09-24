export interface SecondLevelPage {
  title?: string;
  description?: string;
  disabled?: boolean;
}

export const robotPage: SecondLevelPage = {
  title: "robot",
};
export const campiApplicativiPage: SecondLevelPage = {
  title: "campi applicativi",
  disabled: true,
};

export const avvolgitoriPageData: SecondLevelPage = {
  title: undefined,
};
