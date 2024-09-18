import React from "react";
import { usePopupStateStore } from "../../zustand-stores";
import ExitRoundBtn from "../reusable/ExitRoundBtn";
import { useQuery } from "@tanstack/react-query";
import { videoQuery } from "../mockdataloader";

const Popup = () => {
  const { setOpen, video } = usePopupStateStore();

  const { data, isLoading } = useQuery(videoQuery(video?.id));

  return (
    <div
      className="absolute left-0 top-0 z-20 h-dvh w-dvw bg-white bg-opacity-60"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="popup header flex items-center justify-between px-6 py-2 text-2xl text-textlightblue">
          <ExitRoundBtn fn={() => setOpen(false)} />
          <h1 className="text-center font-d-din-condensed text-[92px]/[140px]">
            video title
          </h1>

          <div className="h-1 w-6"></div>
        </div>
        <div className="video aspect-video w-full bg-buttonblue bg-opacity-20">
          {isLoading && "caricamento"}
          {data}
        </div>
      </div>
    </div>
  );
};

export default Popup;
