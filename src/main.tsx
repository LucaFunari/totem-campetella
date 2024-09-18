import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import ThirdLevelPage from "./components/third-level-pages/ThirdLevelPage.tsx";
import { QueryClient } from "@tanstack/react-query";
import ProductPage from "./components/third-level-pages/ProductPage.tsx";
import MainPage from "./components/third-level-pages/MainPage.tsx";
import { detailedPageLoader, loader } from "./components/mockdataloader.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SingleProductPage from "./components/third-level-pages/SingleProductPage.tsx";
import FirstLevelPage from "./components/first-level-pages/FirstLevelPage.tsx";
import Azienda from "./components/special-pages/Azienda.tsx";
import Service from "./components/special-pages/Service.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loader(queryClient),

    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <FirstLevelPage /> },
      {
        path: "azienda",
        element: <Azienda />,
      },
      { path: "service", element: <Service /> },
      {
        path: ":sectionId",
        element: <Outlet />,

        children: [
          { path: "", element: <FirstLevelPage />, index: true },
          {
            path: ":pageId",
            loader: async ({ params }) => {
              return () => detailedPageLoader(queryClient, params.pageId!);
            },
            element: <ThirdLevelPage />,
            children: [
              {
                path: "",
                element: <MainPage />,
                index: true,
              },

              {
                path: ":familyId",
                children: [
                  {
                    path: "",
                    index: true,

                    element: <ProductPage />,
                  },
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
