import React from "react";
import { useParams } from "react-router-dom";
import {
  RobotType,
  robotTypesQuery,
  useCSVFile,
  useSingleAsset,
} from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "./PageTitle";
import { VideoGrid } from "./Grids/VideoGrid";
import Spinner from "../reusable/Spinner";
import { useLocalizationStore } from "../../zustand-stores";

const RobotPage = () => {
  const params = useParams() as { id: string; productId: string };

  const { lang } = useLocalizationStore();

  const { data: robotData } = useQuery(robotTypesQuery(lang));

  const currentRobotProduct = React.useMemo(() => {
    const currentRobotType: RobotType = robotData?.find(
      (one) => one.slug == params.id,
    );

    const currentRob = currentRobotType?.children_robots?.find(
      (one) => one.slug == params.productId,
    );

    return currentRob;
  }, [params.id, robotData, params.productId]);

  const { asset, error } = useSingleAsset(
    currentRobotProduct?.acf.immagine_robot,
  );

  const { data: tableData } = useCSVFile(currentRobotProduct?.acf?.file_csv);

  if (currentRobotProduct)
    return (
      <>
        <PageTitle>{currentRobotProduct?.title.rendered}</PageTitle>
        <div className="grid grid-cols-2">
          <p className="flex items-center p-14 font-d-din text-content font-thin italic leading-[4.5rem]">
            {currentRobotProduct?.acf.intro}
          </p>
          <img
            src={asset?.source_url ?? asset?.guid.rendered}
            className="flex-1"
          />
        </div>

        <div className="mt-10 flex-1 p-14">
          <div
            className="break-words font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>strong]:mb-10 [&>strong]:block [&>ul]:ps-20"
            dangerouslySetInnerHTML={{
              __html: currentRobotProduct?.acf.testo ?? "",
            }}
          ></div>
        </div>
        {tableData && (
          <table className="w-full table-auto p-14 font-d-din text-4xl">
            <tbody>
              {tableData.map((row, ind) => (
                <tr key={ind}>
                  {row.map((cell, index, row) => (
                    <td
                      className={`border-4 border-white p-3 text-center text-2xl`}
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
        {currentRobotProduct?.acf.allegato && (
          <VideoGrid content={currentRobotProduct?.acf.allegato} />
        )}
      </>
    );
  else return <Spinner />;
};

export default RobotPage;
