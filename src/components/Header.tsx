import React from "react";
import { usePopupStateStore } from "../zustand-stores";

const Header = () => {
  const { setOpen } = usePopupStateStore();

  return (
    <div className="pointer-events-none absolute z-10 flex h-20 w-full items-center justify-center p-6">
      <img
        onClick={() => setOpen()}
        className="pointer-events-auto"
        src="/asset/loghetto_77837793-f7b3-481a-8b10-bbeadafcb5ae.png"
        alt="logo"
      ></img>
    </div>
  );
};

export default Header;
