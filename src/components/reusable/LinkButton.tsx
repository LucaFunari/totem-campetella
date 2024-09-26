import React from "react";
import { useNavigate } from "react-router-dom";
import { useString } from "../../api/queries";

export const GrayButton = (props: { goTo: string; innerText: string }) => {
  const navigate = useNavigate();

  function navigateFn() {
    if (props.goTo) return navigate(props.goTo);
  }

  const displayedText = useString(props.innerText);

  return (
    <button
      disabled={!props.goTo}
      className="flex h-64 w-[32rem] select-none items-center justify-center rounded-none bg-buttongray px-6 py-2 outline-none hover:border-none hover:bg-buttongraydarker"
      onClick={navigateFn}
    >
      <p className="overflow-hidden text-ellipsis text-nowrap break-words text-center font-d-din-condensed text-[4.6rem] font-bold uppercase text-white">
        {displayedText}
      </p>
    </button>
  );
};

export const BlueButton = (props: {
  goTo: string;
  children?: string;
  iconUrl?: string;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();

  const navigateFn = React.useCallback(() => {
    if (props.goTo) {
      return navigate(props.goTo);
    }
  }, [navigate, props.goTo]);

  const displayedText = useString(props.children);

  return (
    <button
      onClick={navigateFn}
      disabled={props.disabled || !props.goTo}
      className="flex h-64 w-[32rem] select-none items-center justify-center self-center rounded-none border-none bg-buttonblue px-6 py-4 outline-none enabled:hover:bg-buttonbluedarker disabled:cursor-not-allowed disabled:opacity-25"
    >
      {props.iconUrl ? (
        <img src={props.iconUrl} alt="icon" className="w-3/4" />
      ) : (
        <p className="line-clamp-2 overflow-hidden text-ellipsis break-words text-center font-d-din-condensed text-[4.6rem] font-bold uppercase text-white">
          {displayedText}
        </p>
      )}
    </button>
  );
};
