import React from "react";
import { Outlet } from "react-router-dom";
import ThirdLevelPageHeader from "./ThirdLevelPageHeader";

const SecondLevelPageWrapper = () => {
  return (
    <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />
      <div className="flex w-full flex-col overflow-x-auto p-20">
        <Outlet />
      </div>
    </div>
  );
};
export default SecondLevelPageWrapper;
