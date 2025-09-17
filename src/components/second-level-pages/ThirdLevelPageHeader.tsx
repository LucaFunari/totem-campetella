import React from "react";
import { useNavigate } from "react-router-dom";

const ThirdLevelPageHeader = (props: { customLogoPath?: string }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-center bg-white text-black">
      <img
        className="w-[576px] cursor-pointer"
        loading="lazy"
        src={props.customLogoPath ?? "./asset/Logo Campetella.svg"}
        alt="logo"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default ThirdLevelPageHeader;
