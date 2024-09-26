import React from "react";
import Spinner from "./Spinner";

const WholePageSpinner = () => {
  return (
    <div className="absolute z-40 h-full w-full bg-white bg-opacity-60">
      <Spinner scale={"67%"} />
    </div>
  );
};

export default WholePageSpinner;
