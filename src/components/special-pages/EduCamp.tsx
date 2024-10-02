import React from "react";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import PageTitle from "../third-level-pages/PageTitle";
import { useLocalizationStore } from "../../zustand-stores";
import { useQuery } from "@tanstack/react-query";
import { generalSettingsQuery } from "../../api/queries";
import Spinner from "../reusable/Spinner";

const EduCamp = () => {
  const { lang } = useLocalizationStore();
  const { data, isLoading } = useQuery(generalSettingsQuery(lang));

  if (data)
    return (
      <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
        <ThirdLevelPageHeader />

        <div
          className={`flex h-full w-full flex-col items-center justify-start gap-56 px-20 pb-20`}
        >
          <PageTitle iconURL="./asset/Educamp logo.svg"></PageTitle>
          <div
            className="break-words font-d-din text-content [&>*:first-child]:mb-32 [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>strong]:mb-10 [&>strong]:block [&>ul]:ps-20"
            dangerouslySetInnerHTML={{ __html: data["educamp_testo"] }}
          ></div>
          <div className="grid grid-cols-2 items-start justify-items-center gap-28">
            {icons.map((icon) => (
              <div className="relative flex h-min flex-col items-center justify-center text-center font-[Impact] font-black uppercase">
                <div
                  className="overflow-hidden break-words px-12 text-contentLg leading-none [&>h1]:text-[7rem]/[7rem] [&>h2]:text-[4rem]/[5rem] [&>h3]:text-[2rem]/[2.4rem]"
                  dangerouslySetInnerHTML={{ __html: data[icon.innerTextKey] }}
                ></div>
                {icon.bgIcon && (
                  <img
                    src={icon.bgIcon}
                    className="h-[4rem] object-contain"
                  ></img>
                )}
              </div>
            ))}

            <div className="col-span-2">
              <img src="./asset/educamp/iso.png" className="h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    );
  else return <Spinner></Spinner>;
};

export default EduCamp;

const icons: {
  innerTextKey: string;
  bgIcon?: string;
}[] = [
  {
    innerTextKey: "educamp_corsi",
  },
  {
    innerTextKey: "educamp_certificazioni",
  },
  {
    innerTextKey: "educamp_formazione",
  },
  { innerTextKey: "educamp_valutazione", bgIcon: "./asset/educamp/stelle.png" },
];

const resp = {
  educamp_testo:
    "<p>&#8220;Il segreto del successo risiede nell&#8217;abbracciare il cambiamento: la conoscenza è la chiave per navigare queste trasformazioni.”</p>\n<ul>\n<li><strong>EduCamp</strong>, l&#8217;academy Campetella, è un centro di eccellenza dedicato al miglioramento continuo.</li>\n<li><strong>EduCamp</strong> rappresenta il nostro impegno nel garantire ai nostri clienti la migliore esperienza formativa, poiché il loro successo è il nostro successo.</li>\n<li><strong>EduCamp</strong> è la risposta ai bisogni formativi di oggi, offrendo competenze aggiornate e rilevanti in un contesto professionale sempre in trasformazione.</li>\n</ul>\n",
  educamp_corsi: "<h1>8</h1>\n<h2>corsi a catalogo</h2>\n",
  educamp_formazione:
    "<h1>+ 300</h1>\n<h2>persone formate</h2>\n<h3>negli ultimi 6 mesi</h3>\n",
  educamp_certificazioni:
    "<h1>+ 500</h1>\n<h2>ore di formazione erogate</h2>\n<h3>negli ultimi 6 mesi</h3>\n",
  educamp_valutazione: "<h1>4.8/5</h1>\n<h2>valutazione positiva</h2>\n",
};
