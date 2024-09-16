import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useDetailedPageStore, usePopupStateStore } from "../../zustand-stores";
import PageTitle from "./PageTitle";
import { mockDataQuery } from "./mockdataloader";
import { ProductsGrid } from "./Grids/ProductsGrid";
import { VideoGrid } from "./Grids/VideoGrid";

interface productPageType {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string[];
}

const ProductPage = () => {
  const params = useParams() as {
    pageId: string;
    familyId: string;
  };
  const { data: pageData } = useQuery(mockDataQuery());

  const { setTitle } = useDetailedPageStore();

  const currentlyShownElement: productPageType = React.useMemo(() => {
    const page = pageData[params.pageId];

    const productFamily = page[params.familyId];

    return productFamily;
  }, [pageData, params.pageId, params.familyId]);

  React.useEffect(() => {
    if (params.familyId) setTitle(params.familyId);
  }, [setTitle, params]);

  return (
    <div className="flex h-full flex-col justify-between text-white">
      <PageTitle />
      {!currentlyShownElement && <div>Pagina vuota</div>}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-1 flex-col justify-center gap-32">
          <h1 className="text-4xl font-semibold">
            {currentlyShownElement.subtitle}
          </h1>

          <p className="text-2xl">{currentlyShownElement.description}</p>
        </div>
        {currentlyShownElement.content &&
          currentlyShownElement.content?.length > 0 && (
            <VideoGrid content={currentlyShownElement.content} />
          )}

        {currentlyShownElement.products && (
          <ProductsGrid products={currentlyShownElement.products} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
