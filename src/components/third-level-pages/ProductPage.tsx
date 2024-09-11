import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockDataQuery } from "./ThirdLevelPage";
import { useDetailedPageStore } from "../../zustand-stores";
import PageTitle from "./PageTitle";

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
  const { data: pageData } = useQuery(mockDataQuery(params.pageId));

  const { setTitle } = useDetailedPageStore();

  const currentlyShownElement: productPageType = React.useMemo(() => {
    const page = pageData[params.pageId];

    const productFamily = page[params.familyId];

    console.debug(productFamily);

    if (productFamily.title) {
      setTitle(productFamily.title);
    }

    return productFamily;
  }, [pageData, params.pageId, params.familyId, setTitle]);

  const navigate = useNavigate();
  return (
    <div className="w-full">
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
  return (
    <div>
      <hr></hr>
      vids
    </div>
  );
}

export default ProductPage;
