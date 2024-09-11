import { Outlet } from "react-router-dom";
import "./App.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./main";
import Popup from "./components/popup/Popup";
import * as React from "react";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <div className="h-dvh w-full bg-white">
        <Outlet />
      </div>
      <Popup />
    </QueryClientProvider>
  );
}

export default App;
