import * as React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Popup from "./components/popup/Popup";
import { useLocalizationStore, usePopupStateStore } from "./zustand-stores";
import { generalSettingsQuery, useMediaAsset } from "./api/queries";
import { useQuery } from "@tanstack/react-query";

const width = 2160;
const heigth = 3840;

function App() {
  const { isOpen } = usePopupStateStore();
  const { lang } = useLocalizationStore();
  const { data: generalData } = useQuery(generalSettingsQuery(lang));
  const { data } = useMediaAsset();

  const [scale, setScale] = React.useState(1);

  const resizeFunc = React.useCallback(() => {
    const h = window.innerHeight;
    setScale(h / heigth);
  }, []);

  React.useEffect(() => {
    resizeFunc();
    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, [resizeFunc]);

  return (
    <div className="absolute left-1/2 aspect-[9/16] h-dvh -translate-x-1/2 overflow-hidden bg-white">
      <div
        style={{
          width: width,
          height: heigth,
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
