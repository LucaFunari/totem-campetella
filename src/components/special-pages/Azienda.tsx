import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";

const Azienda = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;

  const ref2 = React.useRef();

  React.useEffect(() => {
    ref.current?.scroll(0, 0);
  }, [ref]);

  const scrollFunc = React.useCallback(
    (ref: React.RefObject<HTMLDivElement>) => {
      const div = ref.current;

      if (div) {
        const currentScroll = ref.current?.scrollLeft;
        const child = ref.current?.lastChild as HTMLImageElement;

        console.debug(child.scrollWidth);

        ref.current?.scroll({
          left: 13391 - 2160,
          behavior: "instant",
        });
      }
    },
    [],
  );
  const clickToScroll = React.useCallback(
    (ev: React.MouseEvent<HTMLImageElement>) => {
      console.debug(ev);
    },
    [],
  );

  return (
    <div className="grid h-full grid-rows-[10%_23%_auto] bg-slate-50">
      <ThirdLevelPageHeader />

      <div className="flex flex-col bg-babyblue p-10">
        <GoBackRoundBtn size={100} />

        <div className="flex flex-1 items-center justify-center">
          <p className="line-clamp-2 w-4/5 font-d-din-condensed text-[140px] font-bold text-white">
            Da più di un secolo, produttori di automazioni complesse
          </p>
        </div>
      </div>
      <div className="h-full overflow-x-scroll" ref={ref}>
        {/* <div className="h-full border-[20px] border-lime-400"> */}
        {/* <div className="h-full w-full overflow-scroll"> */}
        <img
          // onClick={clickToScroll}
          src="./asset/Raggruppa_429.png"
          className="h-full max-w-fit select-none object-cover"
          loading="lazy"
        />
        {/* </div> */}
      </div>
      {/* <Header /> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Azienda;
