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
      <div className="flex h-full flex-col">
        <PageTitle>{currentRobotProduct?.title.rendered}</PageTitle>

        <div className="flex h-full grow-0 flex-col overflow-scroll">
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

          <div className="mt-10 flex-1 p-14">
            <div
              className="break-words font-d-din text-content [&>*:first-child]:font-d-din-condensed [&>*:first-child]:text-contentTitle [&>*:first-child]:font-bold [&>*]:list-disc [&>strong]:mb-10 [&>strong]:block [&>ul]:ps-20"
              dangerouslySetInnerHTML={{
                __html: currentRobotProduct?.acf.testo ?? "",
              }}
            ></div>
          </div>

          {/* <table className="font-d-din text-4xl">
          <tbody>
            <tr>
              <td className="border-4 text-center text-5xl">pro</td>
              <td className="border-4 text-center text-5xl">pro</td>
              <td className="border-4 text-center text-5xl">pro</td>
            </tr>
            <tr>
              <td colSpan={2} className="border-4 text-center text-5xl">
                pro
              </td>
              <td className="border-4 text-center text-5xl">pro</td>
            </tr>
          </tbody>
        </table> */}

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
                {/* {parsedTableData?.map((row: string[], ind: number) => (
                <tr key={ind}>
                  {row.map(
                    (cell, index, row) =>
                      cell && (
                        <td
                          className={`border-4 border-white p-3 text-center text-2xl`}
                          key={index}
                          colSpan={
                            row[index + 1]
                              ? 1
                              : row.filter((cells) => cells === "").length + 1
                          }
                        >
                          {cell}
                        </td>
                      ),
                  )}
                </tr>
              ))} */}
              </tbody>
            </table>
          )}
          {currentRobotProduct?.acf.allegato && (
            <VideoGrid content={currentRobotProduct?.acf.allegato} />
          )}
        </div>
      </div>
    );
  else return <Spinner />;
};

export default RobotPage;
