import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useDetailedPageStore } from "../../zustand-stores";
import { mockDataQuery } from "./mockdataloader";

const MainPage = () => {
  const params = useParams() as { pageId: string };

  const { setTitle } = useDetailedPageStore();

  React.useEffect(() => {
    setTitle(params.pageId);
  }, [params, setTitle]);

  const { data: pageData } = useQuery(mockDataQuery());

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

      <div className="content items-star flex w-full flex-1 justify-center overflow-auto">
        <div className="flex h-min w-4/5 flex-wrap items-center justify-center gap-20">
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
  const elementIsntEmpty = React.useMemo(() => {
    const keys = Object.keys(props.obj);

    return keys.length > 1 || !keys.includes("id");
  }, [props.obj]);
  console.debug(elementIsntEmpty);

  return (
    // @ts-expect-error missing detailed obj type
    <Link to={props.obj.id!}>
      <div className="flex shrink-0 grow-0 flex-col items-center gap-5">
        <div
          className={`${elementIsntEmpty ? "bg-yellow-300" : ""} aspect-square h-24 w-24 border-2 border-white`}
        ></div>
        <span className="line-clamp-2 h-[2lh] w-32 break-words text-center text-lg font-semibold uppercase text-white">
          {
            // @ts-expect-error missing detailed obj type
            props.obj.id
          }
        </span>
      </div>
    </Link>
  );
};
