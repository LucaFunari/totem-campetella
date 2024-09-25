import * as React from "react";
import { Allegato, useSingleAsset } from "../../../api/queries";
import { usePopupStateStore } from "../../../zustand-stores";

export interface AllegatoCampo {
  tipo_file: "pdf" | "immagine" | "video";
  anteprima: number;
  file: number;
  didascalia: string;
}
export function VideoGrid(props: {
  content: Allegato[] | AllegatoCampo[] | undefined;
}) {
  if (props.content)
    return (
      <div>
        <h1 className="font-d-din text-content font-bold uppercase">video</h1>
        <hr className="mb-16 mt-2 h-[6px] border-none bg-white"></hr>
        <div className="grid w-full grid-cols-3 justify-between gap-28">
          {props.content.map((vid, index) => (
            <VideoGridChildElem key={index} vid={vid} />
          ))}
        </div>
      </div>
    );
}

function VideoGridChildElem(props: { vid: Allegato | AllegatoCampo }) {
  const { asset: thumbnail } = useSingleAsset(props.vid?.anteprima);

  const vidOpenFn = (vid: Allegato | AllegatoCampo) => {
    setOpen();
    setVideo(vid);
  };

  const { setOpen, setVideo } = usePopupStateStore();

  return (
    <div
      onClick={() => vidOpenFn(props.vid)}
      className="aspect-video max-h-min w-[512px] overflow-clip border-4 border-white"
    >
      {thumbnail ? (
        <img
          loading="lazy"
          className="h-full w-full object-cover object-center"
          src={thumbnail?.source_url}
        />
      ) : (
        <div className="h-full w-full bg-white bg-opacity-40 text-content">
          {props.vid.didascalia}
        </div>
      )}
    </div>
  );
}
