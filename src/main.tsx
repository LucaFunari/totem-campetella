import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Azienda from "./components/second-level-pages/Azienda.tsx";
import Iniezione from "./components/first-level-pages/Iniezione.tsx";
import ThirdLevelPage from "./components/third-level-pages/ThirdLevelPage.tsx";
import HomePage from "./components/first-level-pages/HomePage.tsx";
import { QueryClient } from "@tanstack/react-query";
import ProductPage from "./components/third-level-pages/ProductPage.tsx";
import MainPage from "./components/third-level-pages/MainPage.tsx";
import { loader } from "./components/third-level-pages/mockdataloader.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SingleProductPage from "./components/third-level-pages/SingleProductPage.tsx";

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
            loader: loader(queryClient),
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
                    element: <SingleProductPage />,
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
