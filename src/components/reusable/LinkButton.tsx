import React from "react";
import { Link } from "react-router-dom";

export const GrayButton = (props: { goTo: string; innerText: string }) => {
  return (
    <Link to={props.goTo}>
      <div className="flex h-32 w-80 items-center justify-center bg-buttongray px-6 py-2">
        <p className="overflow-hidden text-ellipsis text-nowrap text-center font-sans text-4xl font-bold uppercase tracking-tighter text-white">
          {props.innerText}
        </p>
      </div>
    </Link>
  );
};

export const BlueButton = (props: { goTo: string; innerText: string }) => {
  return (
    <Link to={props.goTo}>
      <div className="flex h-16 w-36 items-center justify-center self-center bg-buttonblue px-6 py-4">
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-center font-sans text-lg font-bold uppercase tracking-tighter text-white">
          {props.innerText}
        </p>
      </div>
    </Link>
  );
};
