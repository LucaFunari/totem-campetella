import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Azienda from "./components/special-pages/Azienda.tsx";
import Service from "./components/special-pages/Service.tsx";
import {
  estrusioneData,
  homePageData,
  iniezioneData,
} from "./components/first-level-pages/firstlevelpages.ts";
import FirstLevel from "./components/first-level-pages/FirstLevel.tsx";
import SecondLevel from "./components/second-level-pages/SecondLevel.tsx";
import {
  campiApplicativiLoader,
  campiApplicativiQuery,
  estrusioniLoader,
  fineLineaLoader,
  robotTypesLoader,
  robotTypesQuery,
} from "./api/queries.ts";
import {
  campiApplicativiPage,
  robotPage,
} from "./components/second-level-pages/secondlevelpage.ts";
import SecondLevelPageWrapper from "./components/second-level-pages/SecondLevelPageWrapper.tsx";
import ThirdLevel from "./components/third-level-pages/ThirdLevel.tsx";
import RobotPage from "./components/third-level-pages/RobotPage.tsx";
import CampoApplicativo from "./components/third-level-pages/CampoApplicativo.tsx";
import FineLinea from "./components/special-pages/FineLinea.tsx";
import Avvolgitori from "./components/second-level-pages/Avvolgitori.tsx";

export const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <FirstLevel pageData={homePageData} /> },
      {
        path: "azienda",
        element: <Azienda />,
      },
      { path: "service", element: <Service /> },

      {
        path: "iniezione",
        children: [
          {
            path: "",
            element: <FirstLevel pageData={iniezioneData} />,
          },
          {
            path: "robot",
            element: <SecondLevelPageWrapper />,
            children: [
              {
                path: "",

                children: [
                  {
                    path: "",
                    element: (
                      <SecondLevel
                        query={robotTypesQuery}
                        pageData={robotPage}
                      />
                    ),
                    loader: async () => {
                      return () => robotTypesLoader(queryClient);
                    },
                  },
                  {
                    path: ":id",

                    children: [
                      {
                        path: "",
                        element: <ThirdLevel />,
                      },
                      {
                        path: ":productId",
                        element: <RobotPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "campi-applicativi",
            element: <SecondLevelPageWrapper></SecondLevelPageWrapper>,
            children: [
              {
                path: "",
                children: [
                  {
                    path: "",
                    element: (
                      <SecondLevel
                        pageData={campiApplicativiPage}
                        query={campiApplicativiQuery}
                      />
                    ),
                    loader: async () => {
                      return () => campiApplicativiLoader(queryClient);
                    },
                  },
                  { path: ":id", element: <CampoApplicativo /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "estrusione",
        children: [
          {
            path: "",
            element: <FirstLevel pageData={estrusioneData} />,
          },
          {
            path: "avvolgitori",
            element: <SecondLevelPageWrapper />,
            loader: async () => {
              return () => estrusioniLoader(queryClient);
            },
            children: [
              {
                path: "",
                element: <Avvolgitori />,
              },
            ],
          },

          {
            path: "fine-linea",

            element: <FineLinea />,
            loader: async () => {
              return () => fineLineaLoader(queryClient);
            },
          },
        ],
      },

      // {
      //   path: ":sectionId",
      //   element: <Outlet />,

      //   children: [
      //     { path: "", element: <FirstLevelPage />, index: true },
      //     {
      //       path: ":pageId",
      //       loader: async ({ params }) => {
      //         return () => detailedPageLoader(queryClient, params.pageId!);
      //       },
      //       element: <ThirdLevelPage />,
      //       children: [
      //         {
      //           path: "",
      //           element: <MainPage />,
      //           index: true,
      //         },

      //         {
      //           path: ":familyId",
      //           children: [
      //             {
      //               path: "",
      //               index: true,

      //               element: <ProductPage />,
      //             },
      //             {
      //               path: ":productId",
      //               element: <SingleProductPage />,
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
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
