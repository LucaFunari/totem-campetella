import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";

const PageTitle = () => {
  const { title } = useDetailedPageStore();

  return (
    <div className="mb-20 flex w-full flex-col gap-16">
      <GoBackRoundBtn size={50} />
      <p className="line-clamp-2 overflow-clip text-center text-[92px] font-semibold uppercase tracking-tight text-white">
        {title}
      </p>
    </div>
  );
};

export default PageTitle;
