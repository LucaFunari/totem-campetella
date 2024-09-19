import React from "react";
import { useNavigate } from "react-router-dom";
import { gridElement } from "../../../zustand-stores";

const Grid = (props: { elements?: gridElement[] }) => {
  if (props.elements)
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

const Icon = (props: { obj: gridElement }) => {
  const { obj } = props;

  const elementIsEmpty = obj.count == 0;

  const navigate = useNavigate();

  const navigateFn = () => {
    if (!elementIsEmpty) {
      navigate(obj.slug);
    } else return;
  };

  return (
    <div
      onClick={navigateFn}
      className={`${elementIsEmpty && "cursor-not-allowed opacity-50"} flex shrink-0 grow-0 flex-col items-center gap-5`}
    >
      <div
        className={`float-start flex aspect-square items-end justify-center align-middle`}
      >
        {obj.icon ? (
          <img src={obj.icon} loading="lazy" />
        ) : (
          <div className="h-28 w-28 border-2 border-white" />
        )}
      </div>
      <span className="line-clamp-2 h-[2lh] w-32 select-none break-words text-center font-d-din-condensed text-2xl font-semibold uppercase text-white">
        {obj.name}
      </span>
    </div>
  );
};
