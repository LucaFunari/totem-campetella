import React from "react";

const ExitRoundBtn = (props: { fn: () => void }) => {
  return (
    <button
      onClick={props.fn}
      className="aspect-square w-36 rounded-full border-none bg-blue-50 fill-blue-300 outline-none"
    >
      <svg
        className="scale-[67%]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </button>
  );
};
export default ExitRoundBtn;
