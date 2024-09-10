import React from "react";
import { Link } from "react-router-dom";

const GoBackRoundBtn = (props: { className?: string }) => {
  return (
    <Link to="..">
      <button
        className={
          "flex aspect-square h-8 items-center justify-center rounded-full bg-slate-50" +
          " " +
          props.className
        }
      >
        <svg
          className="fill-blue-300"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </button>
    </Link>
  );
};

export default GoBackRoundBtn;
