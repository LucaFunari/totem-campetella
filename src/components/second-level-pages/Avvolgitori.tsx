import React from "react";
import PageTitle from "../third-level-pages/PageTitle";
import { useQuery } from "@tanstack/react-query";
import {
  estrusioniQuery,
  RobotType,
  useSingleAsset,
  useString,
} from "../../api/queries";
import Spinner from "../reusable/Spinner";
import {
  EstrusioniResp,
  ParsedEntita,
  ParsedEstrusioni,
} from "../../api/types";
import { Icon } from "../third-level-pages/Grids/Grid";
import { useLocalizationStore, usePopupStateStore } from "../../zustand-stores";

const Avvolgitori = () => {
  const { lang } = useLocalizationStore();
  const { data } = useQuery(estrusioniQuery(lang)) as {
    data: EstrusioniResp;
    isLoading: boolean;
    error: Error;
  };

  const firstSubElementName = React.useMemo(() => {
    const primaEstrusioneValida = data?.estrusioni?.filter(
      (estr) => estr.count > 0,
    )[0];

    if (primaEstrusioneValida) {
      return primaEstrusioneValida.name;
    }
  }, [data]);

  const firstElementIconID = React.useMemo(() => {
    const primaEstrusioneValida = data?.estrusioni?.filter(
      (estr) => estr.count > 0,
    )[0];

    if (primaEstrusioneValida) {
      return primaEstrusioneValida?.acf?.icona_id;
    }
  }, [data]);

  const { asset } = useSingleAsset(firstElementIconID);

  if (data)
    return (
      <div className="flex flex-col">
        <PageTitle iconURL={asset?.source_url}>{firstSubElementName}</PageTitle>

        {data?.estrusioni
          .sort((a, b) => {
            return a.acf.ordine - b.acf.ordine;
          })
          .filter((ones) => ones.count > 0)
          .map((avvolgitore, index) => (
            <AvvolgitoriSection
              index={index}
              key={avvolgitore.id}
              avvolgitore={avvolgitore}
            />
          ))}

        {data.robot.map((robot) => (
          <RobotSection robot={robot} key={robot.id} />
        ))}

        {/* <div className="h-full overflow-scroll bg-red">
          {data?.robot[0]?.children_robots && (
            <ProductsGrid products={data.robot[0]?.children_robots} />
          )}
        </div> */}
      </div>
    );
  else return <Spinner />;
};

const AvvolgitoriSection = (props: {
  avvolgitore: ParsedEstrusioni;
  index: number;
}) => {
  return (
    <div className="flex w-full flex-col items-center font-d-din-condensed text-contentTitle">
      {props.index !== 0 && (
        <p
          className="line-clamp-2 overflow-clip break-words px-40 text-center font-d-din-condensed text-[184px]/[274px] font-bold uppercase text-white"
          // className="line-clamp-2 overflow-clip p-0 text-center font-d-din-condensed text-[184px]/[278px] font-bold uppercase text-white"
          dangerouslySetInnerHTML={{ __html: props.avvolgitore.name }}
        ></p>
      )}

      <div className="flex h-min w-[95%] flex-wrap items-center justify-center gap-10">
        {props.avvolgitore.children.map((ent, index) => (
          <AvvolgitoreIconWrapper ent={ent} key={index} />
        ))}
      </div>
    </div>
  );
};

const AvvolgitoreIconWrapper = (props: { ent: ParsedEntita }) => {
  const { ent } = props;
  const { asset } = useSingleAsset(ent.acf.estrusione_entita_video);
  const { setVideo, setOpen } = usePopupStateStore();

  const videoOpenFunc = React.useCallback(() => {
    if (asset) {
      setOpen(true);
      setVideo({
        anteprima: undefined,
        didascalia: ent.title.rendered,
        file: ent.acf.estrusione_entita_video,
      });
    } else return;
  }, [setOpen, setVideo, ent, asset]);

  return (
    <Icon
      smaller={true}
      iconID={ent.featured_media}
      obj={{ ...ent, name: ent.title.rendered }}
      specialFn={() => videoOpenFunc()}
    ></Icon>
  );
};

const RobotSection = (props: { robot: RobotType }) => {
  const robotString = useString("estrusione_titolo_avvolgitori");

  return (
    <div className="flex w-full flex-col items-center font-d-din-condensed text-contentTitle">
      <p
        className="line-clamp-2 overflow-clip text-center font-d-din-condensed text-[184px]/[278px] font-bold uppercase text-white"
        dangerouslySetInnerHTML={{ __html: robotString }}
      ></p>
      <div className="flex h-min w-[95%] flex-wrap items-center justify-center gap-10">
        {props.robot.children_robots?.map((robot) => (
          <Icon
            smaller={true}
            iconID={robot.featured_media}
            obj={{ ...robot }}
            key={robot.id}
            shouldNavigate={true}
          ></Icon>
        ))}
      </div>
    </div>
  );
};
export default Avvolgitori;
