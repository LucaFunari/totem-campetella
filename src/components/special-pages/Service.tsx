import React from "react";
import PageTitle from "../third-level-pages/PageTitle";

const Service = () => {
  return (
    <div className="radial-bg grid h-dvh w-full grid-rows-[1fr_9fr] text-white">
      <header className="flex items-center justify-center bg-white">
        <img className="max-w-72" src="/asset/Logo Campetella.svg" alt="logo" />
      </header>

      <div className="flex w-full flex-col p-10">
        <PageTitle>Service</PageTitle>

        <div className="flex flex-1 flex-col items-start p-8">
          <h1 className="font-d-din-condensed text-3xl font-bold">
            Campetella: il partner di fiducia per l’ottimizzazione dei tuoi
            processi produttivi
          </h1>

          <p className="din-test text-2xl font-thin">
            Con un’esperienza di oltre 8000 impianti installati in tutto il
            mondo, l’azienda ha acquisito una conoscenza approfondita delle
            esigenze dei suoi clienti. Questo know-how consente di offrire
            soluzioni su misura e un supporto costante per ogni tipo di
            impianto.
          </p>

          <div className="grid h-56 grid-cols-5">
            {icons.map((icon, index) => (
              <div key={index} className="flex w-44 flex-col items-center">
                <div className="aspect-square h-32 border-2"> </div>

                <span className="font-d-din line-clamp-2 w-full text-center text-2xl font-bold">
                  {icon}
                </span>
              </div>
            ))}
          </div>

          <p className="din-test text-2xl font-thin">
            Con centri di assistenza e più di 60 tecnici altamente qualificati,
            Campetella offre un supporto tempestivo e professionale in tutto il
            mondo.
          </p>

          <img src="/asset/Raggruppa 341.png" alt="planisfero"></img>
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
  "Manutenzione Programmata",
  "Assistenza da remoto",
  "Spedizioni rapida ricambi",
  "Revamping",
  "Formazione",
];

export default Service;
