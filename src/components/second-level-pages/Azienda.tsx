import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { Footer } from "../Footer";
import { BlueButton } from "../reusable/LinkButton";

const Azienda = () => {
  return (
    <div className="relative h-dvh w-full bg-slate-50">
      <Header />
      <div className="h-full min-h-full w-full">
        <Link to={".."}>
          <div className="w-min bg-buttongray">Back</div>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Azienda;
