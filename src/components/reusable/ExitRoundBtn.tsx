import React from "react";

const ExitRoundBtn = (props: { fn: () => void }) => {
  return (
    <button
      onClick={props.fn}
      className="aspect-square rounded-full bg-blue-50 fill-blue-300"
    >
      <svg
        className="scale-75"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 -960 960 960"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </button>
  );
};
export default ExitRoundBtn;

//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 -960 960 960"
//   >
//     <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
//   </svg>
