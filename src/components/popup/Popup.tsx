import React from "react";
import { usePopupStateStore } from "../../zustand-stores";
import ExitRoundBtn from "../reusable/ExitRoundBtn";
import { useSingleAsset } from "../../api/queries";
import SpinnerSmall from "../reusable/SpinnerSmall";

const Popup = () => {
  const { setOpen, video } = usePopupStateStore();

  const { asset, error, isLoading } = useSingleAsset(video?.file as number);

  return (
    <div
      className="absolute left-0 top-0 z-20 h-full w-full bg-white bg-opacity-60"
      // onClick={() => setOpen(false)}
    >
      <div
        className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="popup header flex items-center justify-between px-6 py-2 text-2xl text-textlightblue">
          <ExitRoundBtn fn={() => setOpen(false)} />
          <h1
            className="text-center font-d-din-condensed text-[92px]/[140px]"
            dangerouslySetInnerHTML={{
              __html: video?.didascalia || "missing title",
            }}
          ></h1>

          <div className="h-1 w-6"></div>
        </div>
        <div className="video aspect-video w-full bg-buttonblue bg-opacity-20">
          {isLoading ? (
            <SpinnerSmall />
          ) : (
            <>
              <div className="flex h-full w-full items-center justify-center font-d-din-condensed text-content font-bold text-textlightblue">
                {error?.name}
                <br />
                {error?.message}
              </div>

              {asset?.source_url && (
                <video autoPlay className="h-full w-full" loop>
                  <source src={asset.source_url} />
                </video>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
