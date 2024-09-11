import React from "react";
import { usePopupStateStore } from "../zustand-stores";

const Header = () => {
  const { setOpen } = usePopupStateStore();

  return (
    <div className="pointer-events-none z-10 flex w-full items-center justify-center">
      <img
        // onClick={() => setOpen()}
        className="pointer-events-auto mt-16"
        src="/asset/Logo Campetella.svg"
        alt="logo"
      ></img>
    </div>
  );
};

export default Header;
