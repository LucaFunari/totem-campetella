import React from "react";
import { useNavigate } from "react-router-dom";

const Grid = (props: { elements: any[] }) => {
  console.debug(props.elements);

  return (
    <div className="content items-star flex w-full flex-1 justify-center overflow-auto">
      <div className="flex h-min w-4/5 flex-wrap items-center justify-center gap-20">
        {props.elements.map((obj, index) => (
          <Icon key={index} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default Grid;

const Icon = (props: { obj: object }) => {
  const elementIsntEmpty = React.useMemo(() => {
    const keys = Object.keys(props.obj);

    return keys.length > 2 || !keys.includes("id");
  }, [props.obj]);

  const navigate = useNavigate();

  const navigateFn = () => {
    if (elementIsntEmpty) {
      navigate(props.obj.id!);
    } else return;
  };

  return (
    <div
      onClick={navigateFn}
      className={`${!elementIsntEmpty ? "cursor-not-allowed opacity-50" : ""} flex shrink-0 grow-0 flex-col items-center gap-5`}
    >
      <div
        className={`float-start flex aspect-square items-end justify-center align-middle`}
      >
        {props.obj.icon ? (
          <img
            src={props.obj.icon}
            loading="lazy"
            // className="h-full w-full"
          />
        ) : (
          <div className="h-28 w-28 border-2 border-white" />
        )}
      </div>
      <span className="font-d-din-condensed line-clamp-2 h-[2lh] w-32 break-words text-center text-2xl font-semibold uppercase text-white">
        {
          // @ts-expect-error missing detailed obj type
          props.obj.id
        }
      </span>
    </div>
  );
};
