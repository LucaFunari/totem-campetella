import React from "react";
import { QueryType, RobotTypesList } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import { SecondLevelPage } from "./secondlevelpage";
import PageTitle from "../third-level-pages/PageTitle";
import Grid from "../third-level-pages/Grids/Grid";

const SecondLevel = (props: {
  query: QueryType;
  pageData: SecondLevelPage;
}) => {
  const { data, isError } = useQuery(props.query()) as {
    data: RobotTypesList;
    isError: boolean;
  };

  //   const gridElements: gridElement[] | undefined = React.useMemo(() => {
  //     if (data) {
  //       const parsedData = data.map((elem) => {
  //         return {
  //           id: elem.id,
  //           name: elem.name,
  //           slug: elem.slug,
  //           count: elem.count,
  //         };
  //       });
  //       return parsedData;
  //     }
  //   }, [data]);

  return (
    <>
      <PageTitle>{props.pageData.title}</PageTitle>
      <Grid elements={data} />
    </>
  );
};

export default SecondLevel;
