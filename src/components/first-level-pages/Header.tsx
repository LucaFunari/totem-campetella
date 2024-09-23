import React from "react";

const Header = () => {
  return (
    <div className="pointer-events-none z-10 flex w-full items-center justify-center">
      <a href="totem:servicerequest">
        <img
          loading="lazy"
          className="pointer-events-auto mt-[11rem] w-[35rem]"
          src="/asset/Logo Campetella.svg"
          alt="logo"
        ></img>
      </a>
    </div>
  );
};

export default Header;
