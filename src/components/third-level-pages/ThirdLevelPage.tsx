import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { Outlet, Params, useParams } from "react-router-dom";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import PageTitle from "./PageTitle";

export const mockDataQuery = (id: string) => ({
  queryKey: ["mockData"],
  queryFn: async () => {
    const data = await fetch("/mockdata.json");
    const jsonData = await data.json();
    return jsonData;
  },
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<"pageId"> }) => {
    const query = mockDataQuery(params.pageId ?? "");

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };

const ThirdLevelPage = () => {
  const params = useParams();

  const pageTitle = React.useMemo(() => {
    const lastObjKey = Object.keys(params).slice(-1);

    const lastParam = params[lastObjKey[0]];
    return lastParam;
  }, [params]);

  return (
    <div className="radial-bg grid h-dvh w-full grid-rows-[1fr_9fr]">
      <header className="flex items-center justify-center bg-white">
        <img className="max-w-72" src="/asset/Logo Campetella.svg" alt="logo" />
      </header>

      <div>
        <div className="w-full">
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
              <Icon key={index} obj={obj} />
            ))}
          </div>
        </div> 
        */}
      </div>
    </div>
  );
};

export default ThirdLevelPage;
