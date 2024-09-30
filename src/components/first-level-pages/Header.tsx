import React from "react";
import LangBtn from "../reusable/LangBtn";
import { PageData } from "./FirstLevel";

const Header = (props: { pageData?: PageData }) => {
  return (
    <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
      {props.pageData?.isHomePage && (
        <div className="absolute right-0 flex flex-col items-start gap-5">
          <LangBtn lang="it" />
          <LangBtn lang="en" />
        </div>
      )}
      <a href="totem:servicerequest">
        <img
          loading="lazy"
          className="pointer-events-auto mt-[11rem] min-h-32 w-[35rem]"
          src="./asset/Logo Campetella.svg"
          alt="logo"
        ></img>
      </a>
    </div>
  );
};

export default Header;
