import React from "react";
import { useDetailedPageStore } from "../../zustand-stores";
import { useParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";
import { useTableData } from "../mockdataloader";

const SingleProductPage = () => {
  const params = useParams() as {
    sectionId: string;
    pageId: string;
    familyId: string;
    productId: string;
  };

  const { page } = useDetailedPageStore();

  const currentProduct = React.useMemo(() => {
    const productFamily = page?.children?.find(
      (one) => one.id === params.familyId,
    );
    const product = productFamily?.products?.find(
      (one) => one.id === params.productId,
    );

    return product;
  }, [page, params]);

  const { data: tableData } = useTableData(currentProduct?.table_path);

  return (
    <div className="flex h-full flex-col text-white">
      <PageTitle>{currentProduct?.title}</PageTitle>

      <div className="flex flex-1">
        <div className="grid grid-cols-2">
          <p className="flex flex-1 items-center p-2 font-d-din text-2xl italic">
            {currentProduct?.description_short}
          </p>
          <img src={currentProduct?.img} className="flex-1" />
        </div>
      </div>
      <div className="flex-1 pb-32 pt-32">
        <h1 className="font-d-din-condensed text-4xl font-bold">Titolo</h1>
        <p className="din-test text-2xl font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          saepe impedit nobis suscipit illo laborum. Eaque nesciunt voluptatum
          exercitationem. Aut a ea illum, non culpa repellat delectus eligendi
          atque alias.
        </p>
      </div>

      {tableData && (
        <table className="table-auto font-d-din text-xs">
          <tbody>
            {tableData.map((row, ind) => (
              <tr key={ind}>
                {" "}
                {row.map((cell, index) => (
                  <td
                    className="border-2 border-white p-1 text-center"
                    key={index}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {currentProduct?.content && (
        <VideoGrid content={currentProduct.content} />
      )}
    </div>
  );
};

export default SingleProductPage;
