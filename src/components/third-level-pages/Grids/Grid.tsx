import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gridElement } from "../../../zustand-stores";
import Spinner from "../../reusable/Spinner";
import { useSingleAsset } from "../../../api/queries";

const Grid = ({
  elements,
  variant = "primary",
  shouldNavigate = true,
  large = false,
}: {
  elements?: gridElement[];
  variant?: "primary" | "secondary";
  shouldNavigate?: boolean;
  large?: boolean;
}) => {
  if (elements)
    return (
      <div
        className={`content flex w-full flex-1 items-start justify-center overflow-auto ${variant === "primary" ? "[&_p]:text-white" : "[&_p]:text-medicalgray"}`}
      >
        <GridWrapper
          elements={elements}
          shouldNavigate={shouldNavigate}
          large={large}
        />
      </div>
    );
  else return <Spinner />;
};

export default Grid;

export const GridWrapper = (props: {
  elements: gridElement[];
  shouldNavigate: boolean;
  specialFn?: () => void;
  large: boolean;
}) => {
  return (
    <div
      className={`flex h-min ${props.large ? "w-full gap-1" : "w-[95%] gap-10"} flex-wrap items-center justify-center`}
    >
      {props.elements.map((obj, index) => (
        <Icon
          key={index}
          obj={obj}
          shouldNavigate={props.shouldNavigate}
          specialFn={props.specialFn}
          large={props.large}
        />
      ))}
    </div>
  );
};

export const Icon = (props: {
  obj: gridElement;
  shouldNavigate: boolean;
  specialFn?: () => void;
  iconURL?: string;
  iconID?: number;
  smaller?: boolean;
  large: boolean;
}) => {
  const { obj, specialFn, shouldNavigate, iconID } = props;

  const iconIdFromACF = obj?.acf?.icona ?? obj?.featured_media;

  const { asset, isLoading } = useSingleAsset(iconIdFromACF ?? iconID);

  const elementIsEmpty = obj.count == 0;

  const navigate = useNavigate();

  const iconFn = React.useCallback(() => {
    if (shouldNavigate) {
      if (obj.count !== 0) return navigate(obj.slug);
    } else if (specialFn) return specialFn();
    else return;
  }, [shouldNavigate, specialFn, obj, navigate]);

  const [loaded, setLoaded] = React.useState(false);

  const { pathname } = useLocation();

  const isTitleless = React.useMemo(() => {
    // HARDCODED IN A SPECIFIIC PAGE
    return pathname.includes("cleanroom-execution");
  }, [pathname]);

  return (
    <div
      onClick={() => iconFn()}
      className={`${elementIsEmpty && "cursor-not-allowed opacity-50"} flex shrink-0 grow-0 flex-col items-center gap-5`}
    >
      <div
        className={`float-start flex aspect-square ${isTitleless ? "min-h-[40rem]" : props.large ? "min-h-[30rem]" : "min-h-96"} items-end justify-center overflow-hidden align-middle`}
      >
        {isLoading ? (
          <div className="flex aspect-square h-96 items-center justify-center opacity-40">
            {/* <div className="aspect-square h-60" /> */}
          </div>
        ) : asset ? (
          <img
            src={props.iconURL ?? asset?.source_url}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`aspect-square ${isTitleless ? "h-[40rem]" : "h-96"} scale-125 object-contain transition-opacity ${loaded ? "opacity-100" : "opacity-0"} `}
          />
        ) : (
          <div className="flex aspect-square h-96 items-center justify-center">
            <div className="aspect-square h-60 border-[6px] border-white" />
          </div>
        )}
      </div>

      {!isTitleless && (
        <p
          className={`${props.smaller ? "line-clamp-2 h-[2lh]" : "line-clamp-3 h-[3lh]"} w-[26rem] select-none whitespace-pre-wrap break-words text-center font-d-din-condensed text-[4rem] font-semibold uppercase text-white [&>strong]:mb-10 [&>strong]:block`}
          dangerouslySetInnerHTML={{
            __html: obj.name ?? obj?.title?.rendered,
          }}
        />
      )}
    </div>
  );
};
