import React from "react";
import { usePopupStateStore } from "../../zustand-stores";
import ExitRoundBtn from "../reusable/ExitRoundBtn";

const Popup = () => {
  const { isOpen, setOpen } = usePopupStateStore();

  if (isOpen)
    return (
      <div
        className="absolute left-0 top-0 z-20 h-dvh w-dvw bg-white bg-opacity-60"
        onClick={() => setOpen(false)}
      >
        <div
          className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="popup header text-textlightblue flex h-12 items-center justify-between px-6 py-2 text-2xl">
            <ExitRoundBtn fn={() => setOpen(false)} />
            <h1 className="text-center">TITLE</h1>

            <div className="h-1 w-6"></div>
          </div>
          <div className="popup content radial-bg-2 p-3 text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium dignissimos molestias quae quasi amet et ad
            reprehenderit ut? Facere, optio quasi? Neque beatae, repellendus
            perferendis eligendi architecto accusantium odio optio.
          </div>
        </div>
      </div>
    );
};

export default Popup;
