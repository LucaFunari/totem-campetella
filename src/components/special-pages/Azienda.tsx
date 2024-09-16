import React from "react";
import Header from "../Header";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const Azienda = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;

  React.useEffect(() => {
    ref.current?.scroll(0, 0);
  }, [ref]);

  return (
    <div className="grid h-full grid-rows-[10%_23%_auto] bg-slate-50">
      <header className="flex items-center justify-center bg-white">
        <img className="max-w-72" src="/asset/Logo Campetella.svg" alt="logo" />
      </header>
      <div className="flex flex-col bg-babyblue p-10">
        <GoBackRoundBtn size={50} />

        <div className="flex flex-1 items-center justify-center">
          <p className="font-d-din-condensed line-clamp-2 w-4/5 text-[70px] font-bold text-white">
            Da più di un secolo, produttori di automazioni complesse
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="h-full w-max bg-[#006eb7]" ref={ref}>
          <img src="/asset/Raggruppa_429.png" className="" loading="lazy" />
        </div>
      </div>
      {/* <img
          src="asset/Raggruppa 429.png"
          className="h-full w-full overflow-scroll"
        ></img> */}

      {/* <Header /> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Azienda;
