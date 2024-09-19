import React from "react";
import { useParams } from "react-router-dom";
import {
  Asset,
  RobotType,
  robotTypesQuery,
  useCSVFile,
  useMediaAsset,
  useRobotType,
} from "../../api/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";

const RobotPage = () => {
  const params = useParams() as { id: string; productId: string };

  const { data: robotData } = useQuery(robotTypesQuery());

  const currentRobotProduct = React.useMemo(() => {
    const currentRobotType: RobotType = robotData?.find(
      (one) => one.slug == params.id,
    );

    const currentRob = currentRobotType?.children_robots?.find(
      (one) => one.slug == params.productId,
    );

    return currentRob;
  }, [params.id, robotData, params.productId]);

  const { data: imageData }: Asset = useMediaAsset(
    currentRobotProduct?.featured_media,
  );
  const { data: tableData } = useCSVFile(currentRobotProduct?.acf?.file_csv);

  return (
    <div>
      <PageTitle>{currentRobotProduct?.title.rendered}</PageTitle>
      <div className="flex flex-1">
        <div className="grid grid-cols-2">
          <p className="flex flex-1 items-center p-2 font-d-din text-2xl italic">
            {currentRobotProduct?.acf.intro}
          </p>
          <img src={imageData?.guid?.rendered} className="flex-1" />
        </div>
      </div>

      <div className="flex-1 pb-32 pt-32">
        <div
          className="font-d-din text-2xl [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-4xl [&>*:first-child]:font-bold [&>*]:list-disc [&>ul]:ps-10"
          dangerouslySetInnerHTML={{
            __html: currentRobotProduct?.acf.testo ?? "",
          }}
        ></div>
      </div>

      {tableData && (
        <table className="w-full table-auto font-d-din text-xs">
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

      {currentRobotProduct?.acf.allegati && (
        <VideoGrid content={currentRobotProduct?.acf.allegati} />
      )}
    </div>
  );
};

export default RobotPage;
