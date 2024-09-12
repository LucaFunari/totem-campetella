import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useDetailedPageStore } from "../../zustand-stores";
import PageTitle from "./PageTitle";
import { mockDataQuery } from "./mockdataloader";

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
    <div className="text-white">
      <PageTitle />
      {!currentlyShownElement && <div>Pagina vuota</div>}
      {currentlyShownElement.subtitle}
      <br /> {currentlyShownElement.description}
      {currentlyShownElement.content &&
        currentlyShownElement.content?.length > 0 && (
          <VideoGrid content={currentlyShownElement.content} />
        )}
    </div>
  );
};

export function VideoGrid(props: { content: string[] }) {
  console.debug(props);
  return (
    <div className="border-2">
      vids
      <div className="grid w-full grid-cols-[auto_auto_auto] justify-between gap-14">
        {props.content.map((vid, index) => (
          <div className="aspect-video w-64 bg-white"></div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
