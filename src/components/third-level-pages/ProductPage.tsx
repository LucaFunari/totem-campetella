import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useDetailedPageStore } from "../../zustand-stores";
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

  const { page } = useDetailedPageStore();

  const currentlyShownElement = React.useMemo(() => {
    const elem = page?.children?.find((one) => one.id === params.familyId);

    return elem;
  }, [page, params]);
  if (currentlyShownElement)
    return (
      <div className="flex h-full flex-col justify-between text-white">
        <PageTitle>{currentlyShownElement.title}</PageTitle>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex flex-1 flex-col justify-center gap-32">
            <h1 className="font-d-din-condensed text-4xl font-bold">
              {currentlyShownElement.subtitle}
            </h1>

            <p className="din-test text-3xl">
              {currentlyShownElement.description}
            </p>
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
