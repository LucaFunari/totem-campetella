import { Outlet } from "react-router-dom";
import "./App.css";

import Popup from "./components/popup/Popup";
import { usePopupStateStore } from "./zustand-stores";

function App() {
  const { isOpen } = usePopupStateStore();
  return (
    <>
      <div className="h-dvh w-full bg-white">
        <Outlet />
      </div>
      {isOpen && <Popup />}
    </>
  );
}

export default App;
