import React from "react";
import SecondLevelPageWrapper from "../second-level-pages/SecondLevelPageWrapper";
import PageTitle from "../third-level-pages/PageTitle";
import { useQuery } from "@tanstack/react-query";
import {
  generalSettingsQuery,
  getFineLineaQuery,
  useSingleAsset,
  useString,
} from "../../api/queries";
import Spinner from "../reusable/Spinner";
import { AllegatoCampo, VideoGrid } from "../third-level-pages/Grids/VideoGrid";
import { useLocalizationStore } from "../../zustand-stores";

interface mockFineLineaData {
  data: {
    title: string;
    titleKey: string;
    subtitle: string;
    description: string;
    featured_media: number;
    allegati: {
      "allegato-immagine": number;
      "allegato-video": number;
      "allegato-file": string;
      "allegato-didascalia": string;
    }[];
  };
}

const FineLinea = () => {
  const { lang } = useLocalizationStore();
  const { data: settingsData } = useQuery(generalSettingsQuery(lang));

  const { asset } = useSingleAsset(settingsData?.settings?.linea_immagine);

  const parsedTesto = React.useMemo(() => {
    return "<div>" + settingsData?.settings.linea_testo + "</div>";
  }, [settingsData]);

  const parsedVideoList = React.useMemo(() => {
    const videoList = settingsData?.settings.linea_lista_video;

    if (videoList) {
      const ao: AllegatoCampo[] = videoList.map((vid) => {
        return {
          anteprima: vid.immagine_anteprima_video,
          file: vid["estrusione-video"],
          didascalia: settingsData.settings.linea_titolo,
          tipo_file: "video",
        };
      });
      return ao;
    }
  }, [settingsData]);

  return (
    <SecondLevelPageWrapper>
      {settingsData?.settings ? (
        <>
          <PageTitle>{settingsData?.settings?.linea_titolo}</PageTitle>

          <div className="flex h-full flex-col justify-between p-14 font-d-din text-content">
            <pre
              dangerouslySetInnerHTML={{
                __html: settingsData.settings.linea_testo,
              }}
              className="whitespace-pre-wrap font-d-din text-content [&>h1]:font-d-din-condensed [&>h1]:text-contentTitle [&>h1]:font-bold"
            >
              {/* {data.description} */}
            </pre>
            {asset && (
              <img className="w-full" src={asset?.source_url} loading="lazy" />
            )}
            {parsedVideoList && (
              <VideoGrid content={parsedVideoList}></VideoGrid>
            )}

            {/* {data.allegati && <VideoGrid content={data.allegati} />} */}
          </div>
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </SecondLevelPageWrapper>
  );
};

export default FineLinea;
