import React from "react";
import PageTitle from "./PageTitle";
import { useQuery } from "@tanstack/react-query";
import { RobotType, robotTypesQuery } from "../../api/queries";
import { useParams } from "react-router-dom";
import { ProductsGrid } from "./Grids/ProductsGrid";

const ThirdLevel = () => {
  const { data } = useQuery(robotTypesQuery());
  const params = useParams();

  const currentRobotType: RobotType | undefined = React.useMemo(() => {
    if (data) {
      // @ts-expect-error data reponse type not defined
      const rob = data?.find((one) => one.slug === params.id);

      return rob;
    }
  }, [params, data]);

  return (
    <>
      <PageTitle>{currentRobotType?.name}</PageTitle>

      {currentRobotType?.children_robots && (
        <ProductsGrid products={currentRobotType.children_robots} />
      )}
    </>
  );
};

export default ThirdLevel;
