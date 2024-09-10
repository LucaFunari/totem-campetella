import React from "react";
import Header from "../Header";
import { BlueButton } from "../reusable/LinkButton";
import { Footer } from "../Footer";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const Iniezione = () => {
  return (
    <div
      className="relative grid h-dvh w-full bg-slate-50"
      style={{ gridTemplateRows: "5fr 5fr 1fr" }}
    >
      <Header />
      <div className="cover flex aspect-square w-full items-end justify-center bg-[url('/asset/pexels-pixabay-257636.jpg')] bg-cover bg-bottom p-10">
        <div className="flex items-center gap-2">
          <GoBackRoundBtn />

          <h1 className="text-4xl font-bold text-white">INIEZIONE</h1>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-2 gap-y-6">
          <BlueButton
            goTo="campi_applicativi"
            innerText="campi applicativi"
          ></BlueButton>
          <BlueButton goTo="robot" innerText="robot"></BlueButton>
          <BlueButton goTo="" innerText="service"></BlueButton>
          <BlueButton goTo="" innerText="edu camp"></BlueButton>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Iniezione;
