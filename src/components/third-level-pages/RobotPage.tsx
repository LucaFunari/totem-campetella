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
  const params = useParams() as {
    id?: string;
    productId?: string;
    robotId?: string;
  };

  const { lang } = useLocalizationStore();

  const { data: robotData } = useQuery(robotTypesQuery(lang)) as {
    data: RobotType[];
  };

  const currentRobotProduct = React.useMemo(() => {
    if (params.id && params.productId) {
      const currentRobotType = robotData?.find((one) => one.slug == params.id);

      const currentRob = currentRobotType?.children_robots?.find(
        (one) => one.slug == params.productId,
      );

      return currentRob;
    } else if (params.robotId) {
      const a = robotData
        ?.map((robType) => {
          const a = robType?.children_robots?.find(
            (one) => one.slug === params.robotId,
          );
          if (a) {
            return a;
          } else return null;
        })
        .find((one) => one !== null);

      return a;
    }
  }, [params, robotData]);

  const videosList = React.useMemo(() => {
    if (params.id) {
      const currentFamily = robotData?.find((one) => one.slug == params.id);
    }
  }, [robotData, params]);

  const { asset, error } = useSingleAsset(
    currentRobotProduct?.acf.immagine_robot,
  );

  const { data: tableData } = useCSVFile(currentRobotProduct?.acf?.file_csv);

  const parsedTableData = React.useMemo(() => {
    if (tableData) {
      if (!tableData[0][0]) {
        tableData[0][0] = "  ";
      } else return tableData;
    }
  }, [tableData]);

  const parsedTableData2 = React.useMemo(() => {
    if (tableData) {
      const newTableData = tableData.map((row: string[]) =>
        row.map((cell: string, index: number, row: string[]) => {
          if (cell == "") return null;
          else {
            const nextCell = row[index + 1];

            if (nextCell == "") {
              let numberOfEmptyCells = 0;

              for (let i = index + 1; i < row.length; i++) {
                if (row[i] == "") {
                  numberOfEmptyCells++;
                } else break;
              }
              return { cellContent: cell, colSpan: numberOfEmptyCells + 1 };
            } else return { cellContent: cell, colSpan: 1 };
          }
        }),
      );
      return newTableData;
    }
  }, [tableData]);

  if (currentRobotProduct)
    return (
      <div className="flex-col gap-3 overflow-y-scroll">
        <div className="flex flex-1 flex-col overflow-y-scroll">
          <PageTitle>{currentRobotProduct?.title.rendered}</PageTitle>

          <div className="grid grid-cols-2">
            <p className="flex items-center p-14 font-d-din text-content font-thin italic leading-[4.5rem]">
              {currentRobotProduct?.acf.intro}
            </p>
            <img
              src={asset?.source_url ?? asset?.guid.rendered}
              loading="lazy"
              className="min-h-[705px] flex-1"
            />
          </div>

          <div className="p-14 pb-28">
            <div
              className="break-words font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:mb-10 [&>*]:block [&>*]:list-disc [&>ul]:ps-20 [&>ul]:pt-10"
              dangerouslySetInnerHTML={{
                __html: currentRobotProduct?.acf.testo ?? "",
              }}
            ></div>
          </div>

          {parsedTableData2 && (
            <table className="w-full table-auto p-14 font-d-din text-4xl">
              <tbody>
                {parsedTableData2?.map(
                  (
                    row: { cellContent: string; colSpan: number }[],
                    ind: number,
                  ) => (
                    <tr key={ind}>
                      {row.map(
                        (cell, index, row) =>
                          cell && (
                            <td
                              className={`border-4 border-white p-3 text-center text-2xl`}
                              key={index}
                              colSpan={cell.colSpan}
                            >
                              {cell.cellContent}
                            </td>
                          ),
                      )}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>

        {currentRobotProduct?.acf.allegato && (
          <VideoGrid content={currentRobotProduct?.acf.allegato} />
        )}
      </div>
    );
  else return <Spinner />;
};

export default RobotPage;
