import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";

const PageTitle = (props: { children?: string }) => {
  const { page } = useDetailedPageStore();

  const title = React.useMemo(() => {
    return props.children ?? page?.title;
  }, [props, page]);

  return (
    <div className="mb-20 flex w-full select-none flex-col gap-32">
      <GoBackRoundBtn size={100} />
      {title && (
        <p className="line-clamp-2 overflow-clip text-center font-d-din-condensed text-[184px] font-bold uppercase text-white">
          {title}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
