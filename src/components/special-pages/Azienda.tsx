import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import { useQuery } from "@tanstack/react-query";
import { generalSettingsQuery, useSingleAsset } from "../../api/queries";
import { useLocalizationStore } from "../../zustand-stores";
import SpinnerSmall from "../reusable/SpinnerSmall";

const Azienda = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const { lang } = useLocalizationStore();

  const { data: settingsData } = useQuery(generalSettingsQuery(lang));

  const ref2 = React.useRef();

  const { asset: assetData, isLoading } = useSingleAsset(
    settingsData?.settings?.azienda_immagine,
  );

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
      ev.stopPropagation();
      console.debug(ev.currentTarget);
    },
    [],
  );

  return (
    <div className="grid h-full grid-rows-[10%_23%_auto] bg-slate-50">
      <ThirdLevelPageHeader />

      <div className="flex flex-col bg-babyblue p-10">
        <GoBackRoundBtn size={100} />

        <div className="flex flex-1 items-center justify-center">
          <p
            className="line-clamp-2 w-4/5 break-words font-d-din-condensed text-[140px] font-bold text-white"
            dangerouslySetInnerHTML={{
              __html: settingsData?.settings?.azienda_titolo,
            }}
          ></p>
        </div>
      </div>
      <div
        onClick={clickToScroll}
        className="relative h-full overflow-x-scroll bg-buttonblue"
        ref={ref}
      >
        {/* <div className="h-full border-[20px] border-lime-400"> */}
        {/* <div className="h-full w-full overflow-scroll"> */}

        {isLoading && (
          <div className="absolute flex h-full w-full items-center justify-center">
            <SpinnerSmall></SpinnerSmall>
          </div>
        )}

        <img
          src={assetData?.source_url}
          className="h-full max-w-fit select-none bg-buttonblue object-cover"
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
