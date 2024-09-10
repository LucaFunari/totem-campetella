import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, Params, useLoaderData, useParams } from "react-router-dom";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const mockDataQuery = (id: string) => ({
  queryKey: ["mockData"],
  queryFn: async () => {
    console.debug(id);
    const data = await fetch("/mockdata.json");
    const jsonData = await data.json();
    return jsonData;
  },
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<"typeId"> }) => {
    const query = mockDataQuery(params.typeId ?? "");

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };

const ThirdLevelPage = () => {
  const data = useLoaderData() as { [key: string]: object };
  const params = useParams() as { typeId: string };

  const dataToShow = React.useMemo(() => {
    return data[params.typeId];
  }, [params, data]);

  const dataAsArray = React.useMemo(() => {
    const array = Object.keys(dataToShow).map((key) => {
      return {
        // @ts-expect-error spreading obj without any type
        ...dataToShow[key],
        id: key,
      };
    });
    return array;
  }, [dataToShow]);

  return (
    <div className="radial-bg grid h-dvh w-full grid-rows-[1fr_9fr]">
      <header className="bg-slate-50">
        <img
          src="/asset/loghetto_77837793-f7b3-481a-8b10-bbeadafcb5ae.png"
          alt="logo"
        />
      </header>
      <div>
        <div className="flex w-full flex-col p-6">
          <div className="">
            <GoBackRoundBtn className="scale-75" />
          </div>

          <p className="line-clamp-2 overflow-clip text-center text-4xl font-semibold uppercase text-white">
            {params.typeId}
          </p>
        </div>
        <div className="content w-full overflow-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {dataAsArray.map((obj, index) => (
              <Icon key={index} obj={obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Icon = (props: { obj: object }) => {
  console.debug(props.obj);
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

export default ThirdLevelPage;
