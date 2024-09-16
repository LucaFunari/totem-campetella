import React from "react";
import Header from "../Header";
import { BlueButton } from "../reusable/LinkButton";
import { Footer } from "../Footer";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const links = [
  {
    title: "campi applicativi",
    goTo: "campi_applicativi",
  },
  {
    title: "robot",
    goTo: "robot",
  },
];

const Iniezione = () => {
  return (
    <div className="grid h-dvh w-full grid-rows-[5fr_5fr_1fr] bg-white">
      <div className="cover flex aspect-square w-full flex-col bg-[url('/asset/SfondoIniezione.png')] bg-cover bg-bottom px-10 py-10 pb-20">
        <Header />
        <div className="flex-1">
          <GoBackRoundBtn />
        </div>

        <h1 className="font-d-din-condensed text-center text-[140px]/[180px] font-bold text-white">
          INIEZIONE
        </h1>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-2 gap-y-6">
          {links.map((link, index) => (
            <BlueButton goTo={link.goTo} key={index}>
              {link.title}
            </BlueButton>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Iniezione;
