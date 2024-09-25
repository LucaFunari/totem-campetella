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

  if (currentRobotType)
    return (
      <div className="mauro flex h-full flex-col overflow-clip">
        <PageTitle>{currentRobotType?.name}</PageTitle>
        <div className="flex flex-1 flex-col gap-10 overflow-scroll">
          {immagineRobot && (
            <img
              src={immagineRobot?.source_url}
              className="h-1/4 w-full object-contain"
            ></img>
          )}
          <div
            className="w-full break-words font-d-din text-content [&>strong]:mb-10 [&>strong]:block"
            dangerouslySetInnerHTML={{ __html: currentRobotType?.acf?.testo }}
          ></div>

          <div className="h-full overflow-scroll">
            {currentRobotType?.children_robots && (
              <ProductsGrid products={currentRobotType.children_robots} />
            )}
          </div>
        </div>
      </div>
    );
  else return <Spinner />;
};

export default ThirdLevel;
