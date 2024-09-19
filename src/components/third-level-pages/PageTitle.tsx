import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";

const PageTitle = (props: { children?: string }) => {
  const { page } = useDetailedPageStore();

  return (
    <div className="mb-20 flex w-full select-none flex-col gap-16">
      <GoBackRoundBtn size={50} />
      <p className="line-clamp-2 overflow-clip text-center font-d-din-condensed text-[92px] font-bold uppercase text-white">
        {props.children ?? page?.title}
      </p>
    </div>
  );
};

export default PageTitle;
