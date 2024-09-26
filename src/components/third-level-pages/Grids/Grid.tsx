import React from "react";
import { useNavigate } from "react-router-dom";
import { gridElement } from "../../../zustand-stores";
import Spinner from "../../reusable/Spinner";
import { useSingleAsset } from "../../../api/queries";

const Grid = (props: { elements?: gridElement[] }) => {
  if (props.elements)
    return (
      <div className="content flex w-full flex-1 items-start justify-center overflow-auto">
        <GridWrapper elements={props.elements} shouldNavigate={true} />
      </div>
    );
  else return <Spinner />;
};

export default Grid;

export const GridWrapper = (props: {
  elements: gridElement[];
  shouldNavigate: boolean;
  specialFn?: () => void;
}) => {
  return (
    <div className="flex h-min w-[95%] flex-wrap items-center justify-center gap-10">
      {props.elements.map((obj, index) => (
        <Icon
          key={index}
          obj={obj}
          shouldNavigate={props.shouldNavigate}
          specialFn={props.specialFn}
        />
      ))}
    </div>
  );
};

export const Icon = (props: {
  obj: gridElement;
  shouldNavigate: boolean;
  specialFn?: () => void;
  iconID?: number;
}) => {
  const { obj, specialFn, shouldNavigate, iconID } = props;

  const iconIdFromACF = obj?.acf?.icona ?? obj?.featured_media;

  const { asset } = useSingleAsset(iconIdFromACF ?? iconID);

  const elementIsEmpty = obj.count == 0;

  const navigate = useNavigate();

  const iconFn = React.useCallback(() => {
    if (shouldNavigate) {
      if (obj.count !== 0) return navigate(obj.slug);
    } else if (specialFn) return specialFn();
    else return;
  }, [shouldNavigate, specialFn, obj, navigate]);

  return (
    <div
      onClick={() => iconFn()}
      className={`${elementIsEmpty && "cursor-not-allowed opacity-50"} flex shrink-0 grow-0 flex-col items-center gap-5`}
    >
      <div
        className={`float-start flex aspect-square items-end justify-center overflow-hidden align-middle`}
      >
        {asset ? (
          <img
            src={asset?.source_url ?? asset?.guid.rendered}
            loading="lazy"
            className="h-96 w-auto scale-125 object-cover"
          />
        ) : (
          <div className="flex aspect-square h-96 items-center justify-center">
            <div className="aspect-square h-60 border-[6px] border-white" />
          </div>
        )}
      </div>
      <p
        className="line-clamp-3 h-[3lh] w-[26rem] select-none whitespace-pre-wrap break-words text-center font-d-din-condensed text-[4rem] font-semibold uppercase text-white [&>strong]:mb-10 [&>strong]:block"
        dangerouslySetInnerHTML={{
          __html: obj.name ?? obj?.title?.rendered,
        }}
      />
    </div>
  );
};
