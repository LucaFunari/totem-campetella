import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import Header from "./Header";
import { BlueButton, GrayButton } from "../reusable/LinkButton";
import { Footer } from "./Footer";
import { useQuery } from "@tanstack/react-query";
import {
  generalSettingsQuery,
  useSingleAsset,
  useString,
} from "../../api/queries";
import { useLocalizationStore } from "../../zustand-stores";

const FirstLevel = (props: { pageData: PageData }) => {
  const { pageData } = props;

  const { lang } = useLocalizationStore();
  const { data } = useQuery(generalSettingsQuery(lang));

  const bgImageID = React.useMemo(() => {
    if (data) {
      const id = data[pageData.bgImgKey];

      return id;
    }
  }, [pageData, data]);

  const { asset: bgImageAsset } = useSingleAsset(bgImageID);

  const pageTitle = useString(pageData.titleKey);

  return (
    <div className="relative grid h-full grid-rows-[5fr_5fr_1fr]">
      <div
        style={
          pageData.bgImgPath
            ? {
                backgroundColor: "#1e4f7d",
                backgroundImage: `url(${bgImageAsset?.source_url ?? pageData.bgImgPath}) `,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",

                backgroundPosition: "center",
              }
            : {}
        }
        className={`cover flex aspect-square w-full flex-col bg-buttonbluedarker bg-opacity-80 bg-contain bg-[20%] px-20 py-10 pb-40`}
      >
        <Header pageData={pageData} />
        <div className="flex-1">
          {!pageData.isHomePage && (
            <div className="mt-52">
              <GoBackRoundBtn />
            </div>
          )}
        </div>

        {pageData.specialLink ? (
          <div className="flex w-full items-center justify-center">
            {pageData.specialLink && (
              <GrayButton
                key={pageData.specialLink.title}
                goTo={pageData.specialLink.goTo}
                innerText={pageData.specialLink.key}
              />
            )}
          </div>
        ) : (
          <h1 className="text-center font-d-din-condensed text-[280px]/[360px] font-bold uppercase text-white">
            {pageTitle}
          </h1>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-6 gap-y-6">
          {pageData.links?.map((section, index, { length }) => (
            <BlueButton
              goTo={section.goTo}
              key={index}
              iconUrl={section.icon}
              disabled={section.disabled}
              className={
                length % 2 === 1 && index + 1 === length
                  ? "col-span-2 !w-full"
                  : undefined
              }
            >
              {section.key ?? section.title}
            </BlueButton>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirstLevel;

export interface PageData {
  title: string;
  titleKey: string;
  bgImgPath?: string;
  bgImgKey: string;
  isHomePage?: boolean;
  specialLink?: { title: string; goTo: string; key: string };
  links?: {
    goTo: string;
    title: string;
    icon?: string;
    disabled?: boolean;
    key: string | null;
  }[];
}
