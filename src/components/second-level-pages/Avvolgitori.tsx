import React from "react";
import PageTitle from "../third-level-pages/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { estrusioniQuery } from "../../api/queries";
import Spinner from "../reusable/Spinner";
import { ParsedEntita, ParsedEstrusioni } from "../../api/types";
import { Icon } from "../third-level-pages/Grids/Grid";
import { useLocalizationStore, usePopupStateStore } from "../../zustand-stores";

const Avvolgitori = () => {
  const { lang } = useLocalizationStore();
  const { data } = useQuery(estrusioniQuery(lang)) as {
    data: ParsedEstrusioni[];
    isLoading: boolean;
    error: Error;
  };

  if (data)
    return (
      <>
        <PageTitle></PageTitle>
        {data
          .filter((ones) => ones.count > 0)
          .map((avvolgitore) => (
            <AvvolgitoriSection
              key={avvolgitore.id}
              avvolgitore={avvolgitore}
            />
          ))}
      </>
    );
  else return <Spinner />;
};

const AvvolgitoriSection = (props: { avvolgitore: ParsedEstrusioni }) => {
  const { setVideo, setOpen } = usePopupStateStore();

  const videoOpenFunc = React.useCallback(
    (data: ParsedEntita) => {
      setOpen(true);
      setVideo({
        anteprima: undefined,
        didascalia: data.title.rendered,
        file: data.acf.estrusione_entita_video,
      });
    },
    [setOpen, setVideo],
  );

  return (
    <div className="flex w-full flex-col items-center font-d-din-condensed text-contentTitle">
      <p className="line-clamp-2 overflow-clip text-center font-d-din-condensed text-[184px]/[278px] font-bold uppercase text-white">
        {props.avvolgitore.name}
      </p>

      <div className="flex h-min w-[95%] flex-wrap items-center justify-center gap-20">
        {props.avvolgitore.children.map((ent, index) => (
          <Icon
            iconID={ent.featured_media}
            obj={{ ...ent, name: ent.title.rendered }}
            key={index}
            specialFn={() => videoOpenFunc(ent)}
          ></Icon>
        ))}
      </div>
    </div>
  );
};

export default Avvolgitori;
