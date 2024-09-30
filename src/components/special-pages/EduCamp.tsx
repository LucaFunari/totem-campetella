import React from "react";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import PageTitle from "../third-level-pages/PageTitle";

const EduCamp = () => {
  return (
    <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />

      <div className="flex w-full flex-col p-20">
        <PageTitle iconURL="./asset/Educamp logo.svg"></PageTitle>
      </div>
    </div>
  );
};

export default EduCamp;
