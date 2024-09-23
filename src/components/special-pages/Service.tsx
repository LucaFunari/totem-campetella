import React from "react";
import PageTitle from "../third-level-pages/PageTitle";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";

const Service = () => {
  return (
    <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />

      <div className="flex w-full flex-col p-20">
        <PageTitle>Service</PageTitle>

        <div className="flex flex-1 flex-col items-center justify-center gap-14 p-16">
          <h1 className="line-clamp-3 w-full font-d-din-condensed text-contentTitle font-bold">
            Campetella: il partner di fiducia per l’ottimizzazione dei tuoi
            processi produttivi
          </h1>

          <p className="font-baiti text-contentLg">
            Con un’esperienza di oltre 8000 impianti installati in tutto il
            mondo, l’azienda ha acquisito una conoscenza approfondita delle
            esigenze dei suoi clienti. Questo know-how consente di offrire
            soluzioni su misura e un supporto costante per ogni tipo di
            impianto.
          </p>

          <div className="grid w-full grid-cols-5 content-start items-start justify-items-center">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="flex w-full flex-col items-center gap-5"
              >
                <div className="aspect-square h-64">
                  <img src={icon.iconPath} className="h-full w-full" />
                </div>
                <span className="line-clamp-2 w-full break-words text-center font-d-din text-[3rem] font-bold uppercase">
                  {icon.title}
                </span>
              </div>
            ))}
          </div>

          <p className="w-full font-baiti text-contentLg">
            Con centri di assistenza e più di 60 tecnici altamente qualificati,
            Campetella offre un supporto tempestivo e professionale in tutto il
            mondo.
          </p>

          <img
            src="/asset/service/Raggruppa 341.png"
            alt="planisfero"
            className="w-full"
          ></img>
        </div>
      </div>
      {/* 
    <div className="flex w-full flex-col p-6">
      <div className="">
        <GoBackRoundBtn className="scale-75" />
      </div>


      <p className="line-clamp-2 overflow-clip text-center text-4xl font-semibold uppercase text-white">
        {params.pageId}
      </p>
    </div>
    <div className="content w-full overflow-auto">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {dataAsArray.map((obj, index) => (
          <Icon key={index} obj={obj} />
        ))}
      </div>
    </div> 
    */}
    </div>
  );
};

const icons = [
  {
    id: "manutenzione",
    title: "Manutenzione Programmata",
    iconPath: "/asset/service/Raggruppa 351.svg",
  },
  {
    id: "assistenza",
    title: "Assistenza da remoto",
    iconPath: "/asset/service/Raggruppa 350.svg",
  },
  {
    id: "spezidioni",
    title: "Spedizioni rapida ricambi",
    iconPath: "/asset/service/Raggruppa 349.svg",
  },
  {
    id: "revamping",
    title: "Revamping",
    iconPath: "/asset/service/Raggruppa 347.svg",
  },
  {
    id: "formazione",
    title: "Formazione",
    iconPath: "/asset/service/Raggruppa 348.svg",
  },
];

export default Service;
