import { usePopupStateStore } from "../../../zustand-stores";

export function VideoGrid(props: { content: string[] }) {
  const { setOpen } = usePopupStateStore();

  const vidOpenFn = (vid: any) => {
    setOpen();

    return () => console.debug("opening popup with video " + vid);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">VIDEO</h1>
      <hr className="mb-6 mt-1 border-2 border-white"></hr>
      <div className="grid w-full grid-cols-[auto_auto_auto] justify-between gap-14">
        {props.content.map((vid, index) => (
          <div
            onClick={() => vidOpenFn(vid)}
            className="aspect-video w-64 border-2 border-white"
          >
            <img src="/public/asset/Raggruppa 63.png"></img>
          </div>
        ))}
      </div>
    </div>
  );
}
