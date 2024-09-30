import React from "react";
import PageTitle from "./PageTitle";
import { useQuery } from "@tanstack/react-query";
import { RobotType, robotTypesQuery, useSingleAsset } from "../../api/queries";
import { useParams } from "react-router-dom";
import { ProductsGrid } from "./Grids/ProductsGrid";
import Spinner from "../reusable/Spinner";
import { useLocalizationStore } from "../../zustand-stores";

const ThirdLevel = () => {
  const { lang } = useLocalizationStore();

  const { data } = useQuery(robotTypesQuery(lang));
  const params = useParams();

  const currentRobotType: RobotType | undefined = React.useMemo(() => {
    if (data) {
      // @ts-expect-error data reponse type not defined
      const rob = data?.find((one) => one.slug === params.id);

      return rob;
    }
  }, [params, data]);

  const { asset: immagineRobot } = useSingleAsset(
    currentRobotType?.acf?.immagine,
  );

  const sortedProducts = React.useMemo(() => {
    return currentRobotType?.children_robots?.sort((a, b) => {
      const keyA = a.slug.toLocaleUpperCase();
      const keyB = b.slug.toLocaleUpperCase();

      return a.acf.ordine - b.acf.ordine;
    });
  }, [currentRobotType?.children_robots]);

  // sort(function (a, b) {
  //   var textA = a.name.toUpperCase();
  //   var textB = b.name.toUpperCase();

  //   return textA.localeCompare(textB);
  // });

  if (currentRobotType)
    return (
      <div className="flex h-full flex-col overflow-clip">
        <PageTitle>{currentRobotType?.name}</PageTitle>
        <div className="flex flex-1 flex-col gap-5 overflow-scroll">
          {immagineRobot && (
            <img
              src={immagineRobot?.source_url}
              className="h-1/5 w-full object-contain"
            ></img>
          )}
          <div
            className="w-full break-words font-d-din text-content [&>strong]:mb-10 [&>strong]:block"
            dangerouslySetInnerHTML={{ __html: currentRobotType?.acf?.testo }}
          ></div>

          <div className="h-full overflow-scroll">
            {sortedProducts && <ProductsGrid products={sortedProducts} />}
          </div>
        </div>
      </div>
    );
  else return <Spinner />;
};

export default ThirdLevel;
