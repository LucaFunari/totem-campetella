import React from "react";
import { useNavigate } from "react-router-dom";

export const GrayButton = (props: { goTo: string; innerText: string }) => {
  const navigate = useNavigate();

  function navigateFn() {
    if (props.goTo) return navigate(props.goTo);
  }

  return (
    <button
      disabled={!props.goTo}
      className="flex h-32 w-80 items-center justify-center rounded-none bg-buttongray px-6 py-2 outline-none hover:border-none hover:bg-buttongraydarker"
      onClick={navigateFn}
    >
      <p className="font-d-din-condensed overflow-hidden text-ellipsis text-nowrap text-center text-4xl font-bold uppercase text-white">
        {props.innerText}
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

  return (
    <button
      onClick={navigateFn}
      disabled={props.disabled || !props.goTo}
      className="flex h-32 w-64 items-center justify-center self-center rounded-none bg-buttonblue px-6 py-4 outline-none hover:border-none enabled:hover:bg-buttonbluedarker disabled:cursor-not-allowed disabled:opacity-25"
    >
      {props.iconUrl ? (
        <img src={props.iconUrl} alt="icon" />
      ) : (
        <p className="font-d-din-condensed line-clamp-2 overflow-hidden text-ellipsis text-center text-4xl font-bold uppercase text-white">
          {props.children}
        </p>
      )}
    </button>
  );
};
