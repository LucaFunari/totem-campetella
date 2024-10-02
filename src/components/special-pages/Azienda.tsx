import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import { useQuery } from "@tanstack/react-query";
import { generalSettingsQuery, useSingleAsset } from "../../api/queries";
import { useLocalizationStore } from "../../zustand-stores";

const Azienda = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const { lang } = useLocalizationStore();

  const { data: settingsData } = useQuery(generalSettingsQuery(lang));

  const { asset: assetData, isLoading } = useSingleAsset(
    settingsData?.azienda_immagine,
  );

  React.useEffect(() => {
    ref.current?.scroll(0, 0);
  }, [ref]);

  return (
    <div className="grid h-full grid-rows-[10%_23%_auto] bg-slate-50">
      <ThirdLevelPageHeader />

      <div className="flex flex-col bg-babyblue p-10">
        <GoBackRoundBtn size={100} />

        <div className="flex flex-1 items-center justify-center">
          <p
            className="line-clamp-2 w-4/5 break-words font-d-din-condensed text-[140px] font-bold text-white"
            dangerouslySetInnerHTML={{
              __html: settingsData?.azienda_titolo,
            }}
          ></p>
        </div>
      </div>
      <div
        className="relative h-full overflow-x-scroll bg-buttonblue"
        ref={ref}
      >
        {/* <div className="h-full border-[20px] border-lime-400"> */}
        {/* <div className="h-full w-full overflow-scroll"> */}

        {isLoading && (
          <div className="absolute flex h-full w-full items-center justify-center"></div>
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
