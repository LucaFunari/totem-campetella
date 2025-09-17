import React from "react";
import { QueryType } from "../../api/queries";
import { SecondLevelPage } from "./secondlevelpage";
import PageTitle from "../third-level-pages/PageTitle";
import Grid from "../third-level-pages/Grids/Grid";
import { useLoaderData } from "react-router-dom";
import { gridElement } from "../../zustand-stores";

const SecondLevel = (props: {
  query?: QueryType;
  pageData: SecondLevelPage;
}) => {
  const data = useLoaderData();

  // const filteredRobotData = React.useMemo(() => {
  //   return data?.filter((robot) => robot.acf.sezione !== "estrusione");
  // }, [data]);

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
      <PageTitle>{props.pageData.titleKey}</PageTitle>

      <Grid elements={data as gridElement[]} />
    </>
  );
};

export default SecondLevel;
