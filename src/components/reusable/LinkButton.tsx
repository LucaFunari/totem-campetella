import React from "react";
import { Link } from "react-router-dom";

export const GrayButton = (props: { goTo: string; innerText: string }) => {
  return (
    <Link to={props.goTo}>
      <div className="bg-buttongray max-w-44 px-6 py-2 ">
        <p className=" font-bold tracking-tighter uppercase text-lg text-white text-ellipsis text-nowrap overflow-hidden font-sans text-center">
          {props.innerText}
        </p>
      </div>
    </Link>
  );
};

export const BlueButton = (props: { goTo: string; innerText: string }) => {
  return (
    <Link to={props.goTo}>
      <div className="self-center bg-buttonblue w-36 px-6 py-4 h-16 flex items-center justify-center">
        <p className="font-bold tracking-tighter uppercase text-lg text-white text-ellipsis  overflow-hidden font-sans text-center line-clamp-2">
          {props.innerText}
        </p>
      </div>
    </Link>
  );
};
