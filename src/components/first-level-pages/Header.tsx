import React from "react";
import LangBtn from "../reusable/LangBtn";
import { PageData } from "./FirstLevel";
import { useNavigate } from "react-router-dom";

const Header = (props: { pageData?: PageData }) => {
  const navigate = useNavigate();

  const navigateTarget = React.useCallback(() => {
    if (props.pageData?.isHomePage) {
      const a = document.createElement("a");
      a.href = "totem:servicerequest";
      a.click();
      document.removeChild(a);
      return;
    } else {
      return navigate("/");
    }
  }, [props.pageData, navigate]);

  return (
    <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
      {props.pageData?.isHomePage && (
        <div className="absolute right-0 flex flex-col items-start gap-5">
          <LangBtn lang="it" />
          <LangBtn lang="en" />
        </div>
      )}

      <div
        className="pointer-events-auto"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigateTarget();
        }}
      >
        <img
          loading="lazy"
          className="pointer-events-auto mt-[11rem] min-h-32 w-[35rem]"
          src="./asset/Logo Campetella.svg"
          alt="logo"
        ></img>
      </div>
    </div>
  );
};

export default Header;
