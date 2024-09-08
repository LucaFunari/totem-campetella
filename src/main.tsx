import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import { HomePage } from "./components/HomePage.tsx";
import ProvaParam, { loadParam } from "./components/ProvaParam.tsx";
import Child from "./components/Child.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Outlet />,
        children: [
          { path: "", element: <HomePage />, index: true },
          {
            path: "child",
            element: <Child />,
          },
        ],
      },
      {
        path: "prova/:testParameter",
        element: <ProvaParam />,
        loader: loadParam,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
