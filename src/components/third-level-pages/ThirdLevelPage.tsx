import React from "react";
import { Outlet } from "react-router-dom";

const ThirdLevelPage = () => {
  return (
    <div className="radial-bg grid h-dvh w-full grid-rows-[1fr_9fr]">
      <header className="flex items-center justify-center bg-white">
        <img className="max-w-72" src="/asset/Logo Campetella.svg" alt="logo" />
      </header>

      <div className="flex w-full flex-col p-10">
        <Outlet />
      </div>
      {/* 
        <div className="flex w-full flex-col p-6">
          <div className="">
            <GoBackRoundBtn className="scale-75" />
          </div>


          <p className="line-clamp-2 overflow-clip text-center text-4xl font-semibold uppercase text-white">
            {params.pageId}
          </p>
        </div>
        <div className="content w-full overflow-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {dataAsArray.map((obj, index) => (
              <Icon key={index} obj={obj} />
            ))}
          </div>
        </div> 
        */}
    </div>
  );
};

export default ThirdLevelPage;
