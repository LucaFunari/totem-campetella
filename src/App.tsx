import { Outlet } from "react-router-dom";
import "./App.css";

import Popup from "./components/popup/Popup";

function App() {
  return (
    <>
      <div className="h-dvh w-full bg-white">
        <Outlet />
      </div>
      <Popup />
    </>
  );
}

export default App;
