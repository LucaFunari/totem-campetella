import React from "react";
import { Outlet } from "react-router-dom";
import ThirdLevelPageHeader from "./ThirdLevelPageHeader";

const SecondLevelPageWrapper = ({
  variant = "primary",
  ...props
}: {
  children?: JSX.Element;
  variant?: "primary" | "secondary";
  customLogoPath?: string
}) => {
  return (
    <div
      className={`grid h-full max-h-full w-full grid-rows-[1fr_9fr] ${variant === "primary" ? "radial-bg text-white" : "bg-secondaryblue text-medicalgray"}`}
    >
      <ThirdLevelPageHeader customLogoPath={props.customLogoPath} />
      <div className="flex max-h-full min-h-0 w-full grow-0 flex-col overflow-hidden px-20">
        {props.children}
        <Outlet />
      </div>
    </div>
  );
};
export default SecondLevelPageWrapper;
