import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import {
  campiApplicativiQuery,
  CampoApplicativo as CampoApplType,
  useSingleAsset,
} from "../../api/queries";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";
import Spinner from "../reusable/Spinner";

const CampoApplicativo = () => {
  const params = useParams();

  const { data } = useQuery(campiApplicativiQuery());

  const currentCampo: CampoApplType | undefined = React.useMemo(() => {
    const campo = data?.find((one) => one.slug === params.id);

    return campo;
  }, [data, params]);

  const { asset, error } = useSingleAsset(currentCampo?.featured_media);

  // const { data: imageData } = useMediaAsset(currentCampo?.featured_media);

  if (currentCampo)
    return (
      <div className="flex h-full flex-col justify-between text-white">
        <PageTitle>{currentCampo?.title.rendered}</PageTitle>
        <div className="flex flex-1 flex-col p-14">
          <div className="flex flex-1 flex-col justify-center gap-64">
            <div className="flex-1 pb-64 pt-64">
              {/* {JSON.stringify(currentCampo)} */}
              <div className="aspect-vid w-full bg-red-50">
                {asset && (
                  <img src={asset?.guid?.rendered} alt="immagine cammpo" />
                )}
              </div>

              <div
                className="[ font-baiti text-contentLg [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>ul]:ps-20"
                dangerouslySetInnerHTML={{
                  __html: currentCampo?.content.rendered ?? "",
                }}
              ></div>
            </div>
          </div>

          <VideoGrid content={currentCampo?.acf?.allegato} />

          {/* {currentlyShownElement.content &&
      currentlyShownElement.content?.length > 0 && (
        <VideoGrid content={currentlyShownElement.content} />
      )}

    {currentlyShownElement.products && (
      <ProductsGrid products={currentlyShownElement.products} />
    )} */}
        </div>
      </div>
    );
  else return <Spinner />;
};

export default CampoApplicativo;
