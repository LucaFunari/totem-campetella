import React from "react";
import GoBackRoundBtn from "../reusable/GoBackRoundBtn";
import { useDetailedPageStore } from "../../zustand-stores";
import { useString } from "../../api/queries";

const PageTitle = (props: {
  children?: string | HTMLImageElement;
  iconURL?: string;
  className?: string;
}) => {
  const { page } = useDetailedPageStore();

  const title = useString((props.children as string) ?? page?.title);

  return (
    <>
      <div
        className={`flex w-full select-none flex-col gap-32 ${props.className}`}
      >
        <div className="fixed top-[574px] box-border">
          <GoBackRoundBtn size={100} />
        </div>

        {props.iconURL ? (
          <div className="mt-24 flex h-[276px] items-center justify-center">
            <img className="h-[164px]" loading="lazy" src={props.iconURL} />
          </div>
        ) : (
          title && (
            <p
              className="mt-24 line-clamp-2 overflow-clip break-words px-40 text-center font-d-din-condensed text-[184px] font-bold uppercase text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            ></p>
          )
        )}

        {!props.iconURL && !title && <div className="h-[180px]" />}
      </div>
    </>
  );
};

export default PageTitle;
