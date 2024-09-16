import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useDetailedPageStore } from "../../zustand-stores";
import { mockDataQuery, mockDetailedQuery } from "./mockdataloader";
import Grid from "./Grids/Grid";

const MainPage = () => {
  const { page } = useDetailedPageStore();

  if (page)
    return (
      <>
        <PageTitle />
        <Grid elements={page.children}></Grid>
      </>
    );
};

export default MainPage;
