import * as React from "react";
import { Allegato, useSingleAsset, useString } from "../../../api/queries";
import { usePopupStateStore } from "../../../zustand-stores";
import SpinnerSmall from "../../reusable/SpinnerSmall";

export interface AllegatoCampo {
  tipo_file: "pdf" | "immagine" | "video";
  anteprima: number;
  file: number;
  didascalia: string;
}

export function VideoGrid(props: {
  content: Allegato[] | AllegatoCampo[] | undefined;
}) {
  const allegatiString = useString("attachments_field_title");
  if (props.content)
    return (
      <div className="mt-10 flex w-full basis-auto flex-col overflow-scroll">
        <h1 className="font-d-din text-content font-bold uppercase">
          {allegatiString}
        </h1>
        <hr className="mt-2 h-[6px] border-none bg-white"></hr>

        <div className="w-full overflow-y-scroll pt-16">
          <div className="grid w-full grid-cols-3 justify-items-center gap-14">
            {/* <div className="flex w-max flex-row flex-nowrap justify-between gap-28"> */}
            {props.content.map((vid, index) => (
              <VideoGridChildElem key={index} vid={vid} />
            ))}
          </div>
        </div>
      </div>
    );
}

function VideoGridChildElem(props: { vid: Allegato | AllegatoCampo }) {
  const { asset: thumbnail, isLoading } = useSingleAsset(props.vid?.anteprima);

  const vidOpenFn = (vid: Allegato | AllegatoCampo) => {
    setOpen();
    setVideo(vid);
  };

  const { setOpen, setVideo } = usePopupStateStore();

  return (
    <div
      onClick={() => vidOpenFn(props.vid)}
      className="aspect-video max-h-min w-[512px] grow-0 overflow-clip border-white last:mb-16"
    >
      {isLoading ? (
        <div className="h-full w-full bg-white opacity-40">
          <SpinnerSmall></SpinnerSmall>
        </div>
      ) : thumbnail ? (
        <img
          loading="lazy"
          className="h-full w-full object-cover object-center"
          src={thumbnail?.source_url}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white bg-opacity-40 text-center text-content font-semibold">
          {props.vid.didascalia}
        </div>
      )}
    </div>
  );
}
