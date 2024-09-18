import React from "react";
import Header from "../reusable/Header";
import { BlueButton, GrayButton } from "../reusable/LinkButton";
import { Footer } from "../reusable/Footer";
import { useQuery } from "@tanstack/react-query";
import { mockDataQuery } from "../mockdataloader";
import { useParams } from "react-router-dom";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const FirstLevelPage = () => {
  const params = useParams() as undefined | { sectionId: string };
  const { data: websiteData } = useQuery(mockDataQuery());

  const isHomePage = React.useMemo(() => {
    if (params?.sectionId) {
      return false;
    } else return true;
  }, [params]);

  const thisPageData = React.useMemo(() => {
    if (websiteData) {
      if (params?.sectionId) {
        const sectionData = websiteData.sections[params.sectionId];

        if (sectionData) return sectionData;
        else throw new Response("Missing Data", { status: 404 });
      } else return websiteData;
    } else throw new Response("Missing Data", { status: 404 });
  }, [websiteData, params]);

  const specialPageLinks = React.useMemo(() => {
    if (thisPageData.specialSections) {
      const links = Object.keys(thisPageData.specialSections).map((key) => {
        return { ...thisPageData.specialSections[key], goTo: key };
      });

      return links;
    }
  }, [thisPageData?.specialSections]);

  const thisPageLinks:
    | { title: string; goTo: string; icon?: string }[]
    | undefined = React.useMemo(() => {
    if (thisPageData.sections) {
      const links = Object.keys(thisPageData.sections).map((key) => {
        return { ...thisPageData.sections[key], goTo: key };
      });
      return links;
    }
  }, [thisPageData?.sections]);

  return (
    <div className="relative grid h-full grid-rows-[5fr_5fr_1fr]">
      <div
        style={
          thisPageData.bgImg && { background: `url(${thisPageData?.bgImg})` }
        }
        className="cover flex aspect-square w-full flex-col bg-buttonbluedarker bg-cover bg-bottom px-10 py-10 pb-20"
      >
        <Header />
        <div className="flex-1">{!isHomePage && <GoBackRoundBtn />}</div>

        {specialPageLinks ? (
          <div className="flex w-full items-center justify-center">
            {specialPageLinks.map((link) => (
              <GrayButton
                key={link.title}
                goTo={link.goTo}
                innerText={link.title}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-center font-d-din-condensed text-[140px]/[180px] font-bold uppercase text-white">
            {thisPageData.title}
          </h1>
        )}
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-2 gap-y-6">
          {thisPageLinks?.map((section, index) => (
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

export default FirstLevelPage;
