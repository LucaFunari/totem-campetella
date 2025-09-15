import React, { useState } from "react";
import PageTitle from "../third-level-pages/PageTitle";
import ThirdLevelPageHeader from "../second-level-pages/ThirdLevelPageHeader";
import { useLocalizationStore } from "../../zustand-stores";
import {
  generalSettingsQuery,
  getServiceQuery,
  useSingleAsset,
} from "../../api/queries";
import { useQuery } from "@tanstack/react-query";

const Service = () => {
  const { lang } = useLocalizationStore();

  const { data: settingsData } = useQuery(generalSettingsQuery(lang));

  const { data: iconsList } = useQuery(getServiceQuery(lang)) as {
    data?: Icona[];
  };

  if (settingsData)
    return (
      <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
        <ThirdLevelPageHeader />

        <div className="flex w-full flex-col px-20">
          <PageTitle>
            {settingsData["service_titolo" as keyof typeof settingsData]}
          </PageTitle>

          <div className="flex flex-1 flex-col items-center justify-center gap-14 p-16">
            <div
              className="w-full break-words font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle"
              dangerouslySetInnerHTML={{
                __html:
                  settingsData["service_testo1" as keyof typeof settingsData],
              }}
            ></div>

            {iconsList ? (
              <div className="grid w-full grid-cols-5 content-start items-start justify-items-center">
                {iconsList
                  ?.sort((a, b) => {
                    return a.acf.ordine - b.acf.ordine;
                  })
                  .map((icon, index) => (
                    <Icona key={index} icon={icon}></Icona>
                  ))}
              </div>
            ) : (
              <div className="h-[400px] w-full"></div>
            )}

            <div
              dangerouslySetInnerHTML={{
                __html:
                  settingsData["service_testo2" as keyof typeof settingsData],
              }}
              className="w-full font-d-din text-content"
            ></div>

            <img
              src="./asset/service/Raggruppa 341.png"
              alt="planisfero"
              className="w-full"
            ></img>
            {/* <TestPlani /> */}
          </div>
        </div>
      </div>
    );
};

const Icona = (props: { icon: Icona }) => {
  const { asset, isLoading } = useSingleAsset(props.icon.acf.icona);

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="aspect-square h-64">
        {isLoading ? (
          <div className="h-full w-full opacity-40"></div>
        ) : (
          <img
            onLoad={() => setLoaded(true)}
            src={asset?.source_url}
            className={`${loaded ? "opacity-100" : "opacity-0"} h-full w-full scale-150 object-contain transition-opacity`}
          />
        )}
      </div>
      <span className="line-clamp-2 w-full break-words text-center font-d-din text-content font-bold uppercase">
        {props.icon.acf.nome}
      </span>
    </div>
  );
};

type Icona = {
  acf: {
    ordine: number;
    nome: string;
    icona: number;
  };
};

export default Service;
