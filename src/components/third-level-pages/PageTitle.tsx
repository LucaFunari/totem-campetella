import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";
import { useString } from "../../api/queries";

const PageTitle = (props: { children?: string }) => {
  const { page } = useDetailedPageStore();

  const title = useString(props.children ?? page?.title);

  return (
    <div className="mb-20 flex w-full select-none flex-col gap-32">
      <GoBackRoundBtn size={100} />
      {title && (
        <p
          className="line-clamp-2 overflow-clip break-words text-center font-d-din-condensed text-[184px] font-bold uppercase text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
      )}
    </div>
  );
};

export default PageTitle;
