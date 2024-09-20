import React from "react";
import { useNavigate } from "react-router-dom";
import { useDetailedPageStore } from "../../zustand-stores";

const GoBackRoundBtn = ({ size = 140 }: { size?: number }) => {
  const navigate = useNavigate();

  const { resetPage } = useDetailedPageStore();

  function buttonFunction() {
    navigate("..");
  }

  return (
    <button
      onClick={buttonFunction}
      className={`flex aspect-square items-center justify-center rounded-full border-none outline-none`}
      style={{ width: size, height: size }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.676 50.668">
        <g
          id="Raggruppa_95"
          data-name="Raggruppa 95"
          transform="translate(-41.38 -229.01)"
        >
          <g id="Raggruppa_96" data-name="Raggruppa 96">
            <path
              id="Tracciato_382"
              data-name="Tracciato 382"
              d="M5.333,45.974A25.338,25.338,0,1,0,30.667,20.64,25.336,25.336,0,0,0,5.333,45.974"
              transform="translate(36.047 208.37)"
              fill="#f1f5f8"
            />
            <path
              id="Unione_1"
              data-name="Unione 1"
              d="M12010.41,11097.482a2.492,2.492,0,0,1-1.768-.732l-8.41-8.412a2.5,2.5,0,0,1,0-3.535c.034-.035.069-.068.105-.1l8.474-8.471a2.5,2.5,0,0,1,3.535,3.537l-6.809,6.806,6.64,6.641a2.5,2.5,0,0,1-1.768,4.268Z"
              transform="translate(-11941.572 -10832.148)"
              fill="#9abce3"
            />
          </g>
        </g>
      </svg>
    </button>
  );
};

export default GoBackRoundBtn;
