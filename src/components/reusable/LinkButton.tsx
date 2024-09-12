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
      className="hover:bg-buttongraydarker flex h-32 w-80 items-center justify-center rounded-none bg-buttongray px-6 py-2 outline-none hover:border-none"
      onClick={navigateFn}
    >
      <p className="overflow-hidden text-ellipsis text-nowrap text-center font-sans text-4xl font-bold uppercase tracking-tighter text-white">
        {props.innerText}
      </p>
    </button>
  );
};

export const BlueButton = (props: {
  goTo: string;
  children: string | JSX.Element;
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
      disabled={!props.goTo}
      className="flex h-32 w-64 items-center justify-center self-center rounded-none bg-buttonblue px-6 py-4 outline-none hover:border-none enabled:hover:bg-buttonbluedarker disabled:cursor-not-allowed disabled:opacity-25"
    >
      <p className="line-clamp-2 overflow-hidden text-ellipsis text-center font-sans text-4xl font-bold uppercase tracking-tight text-white">
        {props.children}
      </p>
    </button>
  );
};
