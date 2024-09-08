import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      HomePage!
      <br></br>
      <Link to={"child"}>Child</Link>
    </div>
  );
};
