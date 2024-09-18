import * as React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import Popup from "./components/popup/Popup";
import { usePopupStateStore } from "./zustand-stores";
import { useRobotList, useRobotType } from "./api/queries";

function App() {
  const { isOpen } = usePopupStateStore();

  const { data } = useRobotList();
  const { data: robotTypeData } = useRobotType(3);

  const [scale, setScale] = React.useState(1);

  const resizeFunc = React.useCallback(() => {
    const h = window.innerHeight;

    setScale(h / 1920);

    // 1920: 1600 = 1: x
  }, []);

  React.useEffect(() => {
    resizeFunc();
    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, [resizeFunc]);

  return (
    <div className="absolute left-1/2 aspect-[9/16] h-dvh -translate-x-1/2 overflow-hidden bg-white">
      <div
        className="h-[1920px] w-[1080px]"
        style={{
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <div className="h-full w-full">
          <Outlet />
          {isOpen && <Popup />}
        </div>
      </div>
    </div>
  );
}

export default App;
