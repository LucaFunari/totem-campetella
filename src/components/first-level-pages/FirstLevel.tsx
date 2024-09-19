import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import Header from "../reusable/Header";
import { BlueButton, GrayButton } from "../reusable/LinkButton";
import { Footer } from "../reusable/Footer";

const FirstLevel = (props: { pageData: PageData }) => {
  const { pageData } = props;

  return (
    <div className="relative grid h-full grid-rows-[5fr_5fr_1fr]">
      <div
        style={
          pageData.bgImgPath
            ? {
                background: `url(${pageData?.bgImgPath}) `,
                backgroundSize: "200%",
                backgroundRepeat: "no-repeat",

                backgroundPosition: "center",
              }
            : {}
        }
        className={`cover flex aspect-square w-full flex-col bg-buttonbluedarker bg-opacity-80 bg-contain bg-[20%] px-10 py-10 pb-20`}
      >
        <Header />
        <div className="flex-1">
          {!pageData.isHomePage && <GoBackRoundBtn />}
        </div>

        {pageData.specialLink ? (
          <div className="flex w-full items-center justify-center">
            {pageData.specialLink && (
              <GrayButton
                key={pageData.specialLink.title}
                goTo={pageData.specialLink.goTo}
                innerText={pageData.specialLink.title}
              />
            )}
          </div>
        ) : (
          <h1 className="text-center font-d-din-condensed text-[140px]/[180px] font-bold uppercase text-white">
            {pageData.title}
          </h1>
        )}
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-2 gap-y-6">
          {pageData.links?.map((section, index) => (
            <BlueButton
              goTo={section.goTo}
              key={index}
              iconUrl={section.icon}
              disabled={section.disabled}
            >
              {section.title}
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
  bgImgPath?: string;
  isHomePage?: boolean;
  specialLink?: { title: string; goTo: string };
  links?: { goTo: string; title: string; icon?: string; disabled?: boolean }[];
}
