import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";
import { useString } from "../../api/queries";

const PageTitle = (props: {
  children?: string | HTMLImageElement;
  iconURL?: string;
}) => {
  const { page } = useDetailedPageStore();

  const title = useString((props.children as string) ?? page?.title);

  return (
    <div className="flex w-full select-none flex-col gap-32">
      <div className="fixed">
        <GoBackRoundBtn size={100} />
      </div>
      {props.iconURL ? (
        <div className="flex w-full items-center justify-center">
          <img className="mt-24 w-[550px]" src={props.iconURL} />
        </div>
      ) : (
        title && (
          <p
            className="mt-24 line-clamp-2 overflow-clip break-words text-center font-d-din-condensed text-[184px] font-bold uppercase text-white"
            dangerouslySetInnerHTML={{ __html: title }}
          ></p>
        )
      )}
    </div>
  );
};

export default PageTitle;
