import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { mockDataQuery, mockDetailedQuery } from "../mockdataloader";
import { useDetailedPageStore } from "../../zustand-stores";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";

const ThirdLevelPage = () => {
  const { setPage } = useDetailedPageStore();
  const params = useParams() as { pageId: string; sectionId?: string };

  const { data: siteData } = useQuery(mockDataQuery());
  const { data: pageData } = useQuery(mockDetailedQuery(params.pageId));

  React.useEffect(() => {
    if (params.sectionId && pageData) {
      const currSection = siteData?.sections[params.sectionId];
      const currentPage = currSection?.sections[params?.pageId];

      if (pageData.children) {
        const children = Object.keys(pageData?.children)?.map((key) => {
          return { ...pageData?.children[key], id: key };
        });
        const page = { ...currentPage, ...pageData, children: children };
        setPage(page);
      } else {
        const page = { ...currentPage, ...pageData };
        setPage(page);
      }
    }
  }, [pageData, params.pageId, params.sectionId, setPage, siteData?.sections]);

  return (
    <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />
      <div className="flex w-full flex-col overflow-x-auto p-10">
        <Outlet />
      </div>
      {/* 
        <div className="flex w-full flex-col p-6">
          <div className="">
            <GoBackRoundBtn className="scale-75" />
          </div>


          <p className="line-clamp-2 overflow-clip text-center text-4xl font-semibold uppercase text-white">
            {params.pageId}
          </p>
        </div>
        <div className="content w-full overflow-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {dataAsArray.map((obj, index) => (
            ))}
          </div>
        </div> 
        */}
    </div>
  );
};

export default ThirdLevelPage;
