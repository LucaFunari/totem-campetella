import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockDataQuery } from "./ThirdLevelPage";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import PageTitle from "./PageTitle";

const MainPage = () => {
  const params = useParams() as { pageId: string };

  const { data: pageData } = useQuery(mockDataQuery(params.pageId));

  const dataToShow = React.useMemo(() => {
    return pageData[params.pageId];
  }, [params, pageData]);

  const dataAsArray = React.useMemo(() => {
    const array = Object.keys(dataToShow).map((key) => {
      return {
        ...dataToShow[key],
        id: key,
      };
    });
    return array;
  }, [dataToShow]);

  return (
    <>
      <PageTitle />

      <div className="content w-full overflow-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {dataAsArray.map((obj, index) => (
            <Icon key={index} obj={obj} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

const Icon = (props: { obj: object }) => {
  return (
    // @ts-expect-error missing detailed obj type
    <Link to={props.obj.id!}>
      <div className="flex h-[104px] shrink-0 grow-0 flex-col items-center">
        <div className="aspect-square h-16 w-16 border-2 border-white"></div>
        <span className="line-clamp-2 w-24 break-words text-center text-sm font-semibold uppercase text-white">
          {
            // @ts-expect-error missing detailed obj type
            props.obj.id
          }
        </span>
      </div>
    </Link>
  );
};
