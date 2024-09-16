import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";

const PageTitle = (props: { children?: string }) => {
  const { page } = useDetailedPageStore();

  return (
    <div className="mb-20 flex w-full flex-col gap-16">
      <GoBackRoundBtn size={50} />
      <p className="font-d-din-condensed line-clamp-2 overflow-clip text-center text-[92px] font-bold uppercase text-white">
        {props.children ?? page?.title}
      </p>
    </div>
  );
};

export default PageTitle;
