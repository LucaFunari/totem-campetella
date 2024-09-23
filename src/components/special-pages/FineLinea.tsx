import React from "react";
import ThirdLevelPage from "../third-level-pages/ThirdLevelPage";
import SecondLevelPageWrapper from "../second-level-pages/SecondLevelPageWrapper";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import PageTitle from "../third-level-pages/PageTitle";

const FineLinea = () => {
  return (
    <SecondLevelPageWrapper>
      <>
        <PageTitle>Fine Linea</PageTitle>

        <div className="h-full font-d-din text-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
          perferendis asperiores velit, impedit suscipit voluptate quisquam
          quidem quo placeat sapiente doloremque ab cumque minima omnis nisi, a
          sunt, libero ratione.
        </div>
      </>
    </SecondLevelPageWrapper>
  );
};

export default FineLinea;
