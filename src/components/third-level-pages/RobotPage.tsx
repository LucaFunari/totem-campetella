import React from "react";
import { useParams } from "react-router-dom";
import {
  Asset,
  RobotType,
  robotTypesQuery,
  useCSVFile,
  useMediaAsset,
} from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";
import Spinner from "../reusable/Spinner";

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

  if (currentRobotProduct)
    return (
      <div>
        <PageTitle>{currentRobotProduct?.title.rendered}</PageTitle>
        <div className="flex flex-1">
          <div className="grid grid-cols-2">
            <p className="flex flex-1 items-center p-8 font-d-din text-content font-thin italic leading-[4.5rem]">
              {currentRobotProduct?.acf.intro}
            </p>
            <img src={imageData?.guid?.rendered} className="flex-1" />
          </div>
        </div>

        <div className="flex-1 pb-64 pt-64">
          <div
            className="font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>ul]:ps-20"
            dangerouslySetInnerHTML={{
              __html: currentRobotProduct?.acf.testo ?? "",
            }}
          ></div>
        </div>

        {tableData && (
          <table className="w-full table-auto font-d-din text-4xl">
            <tbody>
              {tableData.map((row, ind) => (
                <tr key={ind}>
                  {row.map((cell, index) => (
                    <td
                      className="border-4 border-white p-3 text-center text-3xl"
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
  else return <Spinner />;
};

export default RobotPage;
