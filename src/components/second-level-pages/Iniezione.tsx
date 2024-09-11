import React from "react";
import Header from "../Header";
import { BlueButton } from "../reusable/LinkButton";
import { Footer } from "../Footer";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const Iniezione = () => {
  return (
    <div
      className="grid h-dvh w-full bg-white"
      style={{ gridTemplateRows: "5fr 5fr 1fr" }}
    >
      <div className="cover flex aspect-square w-full flex-col bg-[url('/asset/SfondoIniezione.png')] bg-cover bg-bottom px-10 py-10 pb-20">
        <Header />
        <div className="flex-1">
          <GoBackRoundBtn />
        </div>

        <h1 className="text-center text-[140px]/[180px] font-bold text-white">
          INIEZIONE
        </h1>
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
