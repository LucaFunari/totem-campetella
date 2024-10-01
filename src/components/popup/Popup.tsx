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
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-[0_20px_35px_#00000080]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="popup header flex items-center justify-between px-32 py-14 text-2xl text-textlightblue">
          <ExitRoundBtn fn={() => setOpen(false)} />
          <h1
            className="line-clamp-2 w-full break-words text-center font-d-din-condensed text-[8rem]/[8rem] uppercase"
            dangerouslySetInnerHTML={{
              __html: video?.didascalia || "missing title",
            }}
          ></h1>

          <div className="h-1 w-6"></div>
        </div>

        <div className="relative min-h-[1183px] w-full">
          {asset ? (
            <video autoPlay className="relative z-10 h-full w-full p-20" loop>
              <source src={asset?.source_url} />
            </video>
          ) : (
            <div className="relative z-10 w-full p-20 font-d-din-condensed text-contentLg font-bold text-white">
              <div className="flex aspect-video items-center justify-center bg-black text-white">
                {error && (
                  <>
                    {error?.name}
                    <br />
                    {error?.message}
                  </>
                )}
              </div>
            </div>
          )}

          <div className="radial-bg absolute top-0 h-full w-4/5"></div>
        </div>

        {/* <div className="relative aspect-[16/10] w-full">
          <div>
            {error && (
              <div className="absolute z-10 flex h-full w-full items-center justify-center font-d-din-condensed text-contentLg font-bold text-white">
                {error?.name}
                <br />
                {error?.message}
              </div>
            )}
            {isLoading && (
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <SpinnerSmall />
              </div>
            )}

            {asset?.source_url && (
              <video
                muted
                autoPlay
                className="opacity-1.0 absolute z-10 aspect-video h-full w-full border-4 border-blue-500 p-20"
                loop
              >
                <source src={asset.source_url} />
              </video>
            )}
          </div>

          <div className="radial-bg absolute left-0 top-0 z-0 h-full w-4/5"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Popup;
