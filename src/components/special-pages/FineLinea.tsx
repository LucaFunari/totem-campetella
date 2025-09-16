import React from "react";
import SecondLevelPageWrapper from "../second-level-pages/SecondLevelPageWrapper";
import PageTitle from "../third-level-pages/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { generalSettingsQuery, useSingleAsset } from "../../api/queries";
import Spinner from "../reusable/Spinner";
import { AllegatoCampo, VideoGrid } from "../third-level-pages/Grids/VideoGrid";
import { useLocalizationStore } from "../../zustand-stores";

const FineLinea = () => {
  const { lang } = useLocalizationStore();
  const { data: settingsData } = useQuery(generalSettingsQuery(lang));

  const { asset } = useSingleAsset(settingsData?.linea_immagine as number);

  const parsedVideoList = React.useMemo(() => {
    const videoList = settingsData?.linea_lista_video;

    if (videoList && Array.isArray(videoList)) {
      const lista: AllegatoCampo[] = videoList.map((vid) => {
        return {
          anteprima: vid.immagine_anteprima_video,
          file: vid["estrusione-video"],
          didascalia: settingsData.linea_titolo,
          tipo_file: "video",
        };
      });
      return lista;
    }
  }, [settingsData]);

  return (
    <SecondLevelPageWrapper>
      {settingsData ? (
        <>
          <PageTitle>{settingsData?.linea_titolo as string}</PageTitle>

          <div className="flex h-full flex-col gap-20 p-14 font-d-din text-content">
            <pre
              dangerouslySetInnerHTML={{
                __html: settingsData?.linea_testo,
              }}
              className="whitespace-pre-wrap break-words font-d-din text-content [&>h1]:font-d-din-condensed [&>h1]:text-contentTitle [&>h1]:font-bold"
            />
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
