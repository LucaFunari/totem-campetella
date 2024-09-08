import React from "react";
import { Link } from "react-router-dom";

const Child = () => {
  return (
    <div>
      <b>Child</b>
      <br></br>
      <Link to={".."}>Back</Link>
    </div>
  );
};

export default Child;
