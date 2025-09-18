import React from "react";
import { gridElement } from "../../../zustand-stores";
import PageTitle from "../../third-level-pages/PageTitle";
import Grid from "../../third-level-pages/Grids/Grid";
import { useMultipleAssets } from "../../../api/queries";
import MedicalSmallIcon from "./MedicalSmallIcon";
import { useLoaderData } from "react-router-dom";
import { ParsedEstrusioni } from "../../../api/types";
import { VideoGrid } from "../../third-level-pages/Grids/VideoGrid";

function Medical() {
  const data = useLoaderData() as ParsedEstrusioni[];

  if (data)
    return (
      <div className="mb-40 flex h-full flex-col gap-10 text-content text-medicalgray">
        <PageTitle />
        {/* TITLE */}

        {data.map((robot, i) => (
          <RobotTypeSection robot={robot} key={i} />
        ))}
      </div>
    );
}

function RobotTypeSection({ robot }: { robot: ParsedEstrusioni }) {
  const iconsIDs = React.useMemo(() => {
    return robot.acf.icone_aggiuntive?.map(({ icona }) => icona);
  }, [robot]);

  const iconsURLs = useMultipleAssets(iconsIDs ?? []);

  return (
    <>
      <p
        className="mt-24 line-clamp-2 overflow-clip break-words px-40 text-center font-d-din-condensed text-[184px] font-bold uppercase leading-[200px]"
        dangerouslySetInnerHTML={{ __html: robot.name }}
      />
      <p className="line-clamp-6 font-thin">{robot.acf.testo}</p>
      {/* ROBOTS GRID */}
      <div className="flex-1">
        <Grid
          elements={
            // @ts-expect-error every robot as an ORDINE tag but
            robot.children_robots.sort(
              // @ts-expect-error every robot as an ORDINE tag but
              (a, b) => a.acf.ordine - b.acf.ordine,
            ) as gridElement[]
          }
          variant="secondary"
          shouldNavigate={false}
          large
        />
      </div>
      {/* ICONS */}
      <div className="flex">
        {robot.acf.icone_aggiuntive?.map((icon, i) => (
          <MedicalSmallIcon
            key={i}
            title={icon.titolo}
            iconURL={iconsURLs?.get(icon.icona)?.source_url}
          />
        ))}
      </div>
      {/* VIDEO */}

      {robot.acf.allegato && <VideoGrid content={robot.acf.allegato} />}
    </>
  );
}

export default Medical;
