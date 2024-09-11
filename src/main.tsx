import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Azienda from "./components/second-level-pages/Azienda.tsx";
import Iniezione from "./components/second-level-pages/Iniezione.tsx";
import ThirdLevelPage, {
  loader as thirdLevelPageLoader,
} from "./components/third-level-pages/ThirdLevelPage.tsx";
import HomePage from "./components/first-level-pages/HomePage.tsx";
import { QueryClient } from "@tanstack/react-query";
import ContentPage from "./components/third-level-pages/ContentPage.tsx";
import ProductPage from "./components/third-level-pages/ProductPage.tsx";
import MainPage from "./components/third-level-pages/MainPage.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "azienda",
        element: <Azienda />,
      },
      {
        path: "iniezione",
        element: <Outlet />,

        children: [
          { path: "", element: <Iniezione />, index: true },
          {
            path: ":pageId",
            loader: thirdLevelPageLoader(queryClient),
            element: <ThirdLevelPage />,
            children: [
              {
                path: "",
                element: <MainPage />,
                index: true,
              },

              {
                path: ":familyId",
                element: <ProductPage />,
                children: [
                  {
                    path: ":productId",
                    element: <ContentPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
