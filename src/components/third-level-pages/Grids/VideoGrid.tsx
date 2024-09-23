import * as React from "react";
import { Allegato, Asset, useMediaAsset } from "../../../api/queries";
import { usePopupStateStore, video } from "../../../zustand-stores";

export interface AllegatoCampo {
  "allegato-immagine": number;
  "allegato-video": number;
  "allegato-file": string;
  "allegato-didascalia": string;
}

export function VideoGrid(props: {
  content: Allegato[] | AllegatoCampo[] | undefined;
}) {
  // const vidOpenFn = (vid: Allegato) => {
  //   setOpen();
  //   setVideo(vid);

  //   return console.debug("opening popup with video " + vid.tipo);
  // };

  if (props.content)
    return (
      <div>
        <h1 className="text-content font-d-din font-bold uppercase">VIDEO</h1>
        <hr className="mb-16 mt-2 h-[6px] border-none bg-white"></hr>
        <div className="grid w-full grid-cols-[auto_auto_auto] justify-between gap-28">
          {props.content.map((vid, index) => (
            <VideoGridChildElem key={index} vid={vid} />
          ))}
        </div>
      </div>
    );
}

function VideoGridChildElem(props: { vid: Allegato | AllegatoCampo }) {
  const { data: robotallegato }: Asset | undefined = useMediaAsset(
    props.vid.file,
  );

  const { data: thumbnail } = useMediaAsset(props.vid["allegato-immagine"]);

  const vidOpenFn = (vid: Allegato | AllegatoCampo) => {
    setOpen();
    setVideo(vid);
  };

  const { setOpen, setVideo } = usePopupStateStore();

  return (
    <div
      onClick={() => vidOpenFn(props.vid)}
      className="aspect-video w-[512px] overflow-clip border-4 border-white"
    >
      {thumbnail && <img loading="lazy" src={thumbnail?.guid?.rendered} />}

      {/* <img src="/public/asset/Raggruppa_63.png"></img> */}
    </div>
  );
}
