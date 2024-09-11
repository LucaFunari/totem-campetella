import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";

const PageTitle = () => {
  const { title } = useDetailedPageStore();

  return (
    <div className="flex h-14 w-full flex-col bg-red-500">
      <GoBackRoundBtn />

      <p className="line-clamp-2 overflow-clip text-center text-4xl font-semibold uppercase text-white">
        {title}
      </p>
    </div>
  );
};

export default PageTitle;
