import React from "react";
import Header from "../Header";
import { BlueButton, GrayButton } from "../reusable/LinkButton";
import { Footer } from "../Footer";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";

const HomePage = () => {
  return (
    <div
      className="relative grid h-full"
      style={{ gridTemplateRows: "5fr 5fr 1fr" }}
    >
      <div className="cover flex aspect-square w-full flex-col bg-[url('/asset/SfondoIniezione.png')] bg-cover bg-bottom px-10 py-10 pb-20">
        <Header />
        <div className="flex-1"></div>
        <div className="flex w-full items-center justify-center">
          <GrayButton goTo="azienda" innerText="l'azienda" />
        </div>
      </div>

      {/*       
      <div className="cover flex aspect-square w-full items-end justify-center bg-[url('/asset/pexels-ryank-14953684.jpg')] bg-cover bg-bottom p-10">
      </div> */}
      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-2 gap-x-2 gap-y-6">
          <BlueButton goTo="iniezione" innerText="iniezione"></BlueButton>
          <BlueButton goTo="" innerText="text"></BlueButton>
          <BlueButton goTo="" innerText="text"></BlueButton>

          <BlueButton goTo="" innerText="text"></BlueButton>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
