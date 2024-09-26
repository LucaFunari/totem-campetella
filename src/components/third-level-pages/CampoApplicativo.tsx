import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { campiApplicativiQuery, useSingleAsset } from "../../api/queries";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";
import Spinner from "../reusable/Spinner";
import { useLocalizationStore } from "../../zustand-stores";

const CampoApplicativo = () => {
  const params = useParams();

  const { lang } = useLocalizationStore();

  const { data } = useQuery(campiApplicativiQuery(lang));

  const currentCampo = React.useMemo(() => {
    const campo = data?.find((one) => one.slug === params.id);

    return campo;
  }, [data, params]);

  if (currentCampo)
    return (
      <div className="flex h-full flex-col justify-between text-white">
        <PageTitle>{currentCampo?.title.rendered}</PageTitle>
        <div className="flex flex-1 flex-col p-14">
          <div className="flex flex-1 flex-col justify-center gap-64">
            <div className="flex-1 pb-64 pt-64">
              <div className="aspect-vid w-full">
                {/* {asset && <img src={asset?.source_url} alt="immagine campo" />} */}
              </div>

              <div
                className="[ break-words font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>strong]:mb-10 [&>strong]:block [&>ul]:ps-20"
                dangerouslySetInnerHTML={{
                  __html: currentCampo?.acf.testo ?? "",
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
