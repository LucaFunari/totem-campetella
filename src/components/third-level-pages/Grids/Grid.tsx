import React from "react";
import { useNavigate } from "react-router-dom";
import { gridElement } from "../../../zustand-stores";
import Spinner from "../../reusable/Spinner";
import { useSingleAsset } from "../../../api/queries";

const Grid = (props: { elements?: gridElement[] }) => {
  if (props.elements)
    return (
      <div className="content items-star flex w-full flex-1 justify-center overflow-auto">
        <GridWrapper elements={props.elements} />
      </div>
    );
  else return <Spinner />;
};

export default Grid;

export const GridWrapper = (props: { elements: gridElement[] }) => {
  return (
    <div className="flex h-min w-[95%] flex-wrap items-center justify-center gap-20">
      {props.elements.map((obj, index) => (
        <Icon key={index} obj={obj} />
      ))}
    </div>
  );
};

export const Icon = (props: {
  obj: gridElement;
  specialFn?: () => void;
  iconID?: number;
}) => {
  const { obj } = props;

  const iconaIDFromACF = obj?.acf?.icona ?? obj?.featured_media;

  const { asset } = useSingleAsset(iconaIDFromACF ?? props.iconID);

  const elementIsEmpty = obj.count == 0;

  const navigate = useNavigate();

  const navigateFn = () => {
    if (!elementIsEmpty) {
      navigate(obj.slug);
    } else return;
  };

  return (
    <div
      onClick={props.specialFn ?? navigateFn}
      className={`${elementIsEmpty && "cursor-not-allowed opacity-50"} flex shrink-0 grow-0 flex-col items-center gap-5`}
    >
      <div
        className={`float-start flex aspect-square items-end justify-center align-middle`}
      >
        {asset ? (
          <img
            src={asset?.source_url ?? asset?.guid.rendered}
            loading="lazy"
            className="h-96 w-auto"
          />
        ) : (
          <div className="flex aspect-square h-96 items-center justify-center">
            <div className="aspect-square h-60 border-[6px] border-white" />
          </div>
        )}
      </div>
      <p
        className="line-clamp-2 h-[2lh] w-96 select-none whitespace-pre-wrap break-words text-center font-d-din-condensed text-[4rem] font-semibold uppercase text-white [&>strong]:mb-10 [&>strong]:block"
        dangerouslySetInnerHTML={{
          __html: props.obj.name ?? props?.obj?.title?.rendered,
        }}
      />
    </div>
  );
};
