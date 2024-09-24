import React from "react";
import SecondLevelPageWrapper from "../second-level-pages/SecondLevelPageWrapper";
import PageTitle from "../third-level-pages/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { Asset, getFineLineaQuery, useMediaAsset } from "../../api/queries";
import Spinner from "../reusable/Spinner";
import { VideoGrid } from "../third-level-pages/Grids/VideoGrid";

interface mockFineLineaData {
  data: {
    title: string;
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
  const { data } = useQuery(getFineLineaQuery()) as mockFineLineaData;

  const { data: imageData } = useMediaAsset(data?.featured_media) as {
    data: Asset;
  };

  if (data)
    return (
      <SecondLevelPageWrapper>
        <>
          <PageTitle>{data.title}</PageTitle>

          <div className="flex h-full flex-col justify-between p-14 font-d-din text-content">
            <div className="font-d-din-condensed text-contentTitle font-bold">
              {data.subtitle}
            </div>
            <pre className="whitespace-pre-wrap font-baiti text-contentLg">
              {data.description}
            </pre>
            {imageData && (
              <img className="w-full" src={imageData?.guid?.rendered}></img>
            )}
            {data.allegati && <VideoGrid content={data.allegati} />}
          </div>
        </>
      </SecondLevelPageWrapper>
    );
  else return <Spinner />;
};

export default FineLinea;
