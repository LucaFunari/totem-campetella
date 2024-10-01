import React from "react";
import { Outlet } from "react-router-dom";
import ThirdLevelPageHeader from "./ThirdLevelPageHeader";

const SecondLevelPageWrapper = (props: { children?: JSX.Element }) => {
  return (
    <div className="radial-bg grid h-full max-h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />
      <div className="flex max-h-full min-h-0 w-full grow-0 flex-col overflow-hidden px-20">
        {props.children}
        <Outlet />
      </div>
    </div>
  );
};
export default SecondLevelPageWrapper;
