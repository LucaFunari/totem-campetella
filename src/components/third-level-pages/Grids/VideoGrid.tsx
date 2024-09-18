import { usePopupStateStore, video } from "../../../zustand-stores";

export function VideoGrid(props: { content: video[] }) {
  const { setOpen, setVideo } = usePopupStateStore();

  const vidOpenFn = (vid: video) => {
    setOpen();
    setVideo(vid);

    return console.debug("opening popup with video " + vid.id);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">VIDEO</h1>
      <hr className="mb-6 mt-1 h-[3px] border-none bg-white"></hr>
      <div className="grid w-full grid-cols-[auto_auto_auto] justify-between gap-14">
        {props.content.map((vid, index) => (
          <div
            key={index}
            onClick={() => vidOpenFn(vid)}
            className="aspect-video w-64 border-2 border-white"
          >
            <img src="/public/asset/Raggruppa_63.png"></img>
          </div>
        ))}
      </div>
    </div>
  );
}
