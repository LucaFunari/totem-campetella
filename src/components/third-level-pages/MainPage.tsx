import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useDetailedPageStore } from "../../zustand-stores";
import { mockDataQuery } from "./mockdataloader";
import Grid from "./Grids/Grid";

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

      <Grid elements={dataAsArray}></Grid>
    </>
  );
};

export default MainPage;
