import * as React from "react";
import { Allegato, Asset, useMediaAsset } from "../../../api/queries";
import { usePopupStateStore, video } from "../../../zustand-stores";

export function VideoGrid(props: { content: Allegato[] }) {
  const allegatiDaMostrare = React.useMemo(() => {
    const vid = props.content.filter((ones) => ones.tipo === "immagine");
    return vid;
  }, [props.content]);

  // const vidOpenFn = (vid: Allegato) => {
  //   setOpen();
  //   setVideo(vid);

  //   return console.debug("opening popup with video " + vid.tipo);
  // };

  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">VIDEO</h1>
      <hr className="mb-6 mt-1 h-[3px] border-none bg-white"></hr>
      <div className="grid w-full grid-cols-[auto_auto_auto] justify-between gap-14">
        {allegatiDaMostrare.map((vid, index) => (
          <VideoGridChildElem key={index} vid={vid} />
        ))}
      </div>
    </div>
  );
}

function VideoGridChildElem(props: { vid: Allegato }) {
  const { data }: Asset | undefined = useMediaAsset(props.vid.file);

  const vidOpenFn = (vid: Allegato) => {
    setOpen();
    setVideo(vid);

    return console.debug("opening popup with video " + vid.tipo);
  };

  const { setOpen, setVideo } = usePopupStateStore();

  return (
    <div
      onClick={() => vidOpenFn(props.vid)}
      className="aspect-video w-64 border-2 border-white"
    >
      {data?.title?.rendered}
      {/* <img src="/public/asset/Raggruppa_63.png"></img> */}
    </div>
  );
}
