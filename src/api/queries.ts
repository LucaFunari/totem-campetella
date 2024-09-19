import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../main";

export const useRobotList = () => {
  return useQuery({
    queryKey: ["robotList"],
    queryFn: async () => {
      const data = await fetch(import.meta.env.VITE_ROBOT_LIST_ENDPOINT);

      const json = await data.json();
      return json;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const robotTypesQuery: QueryType = () => ({
  queryKey: ["robotTypes"],
  queryFn: async () => {
    const data = await fetch(import.meta.env.VITE_ROBOT_TYPE_ENDPOINT);
    const json = await data.json();

    const robotList = await fetch(import.meta.env.VITE_ROBOT_LIST_ENDPOINT);

    const robotListJson: Robot[] = await robotList.json();

    const parsedRobots = robotListJson.map((robot) => {
      return {
        id: robot.id,
        acf: robot.acf,
        featured_media: robot.featured_media,
        tipo_robot: robot["tipo-robot"],
        slug: robot.slug,
        title: robot.title,
      };
    });

    const parsedJson = json.map((elem: RobotType) => {
      return {
        id: elem.id,
        name: elem.name,
        slug: elem.slug,
        count: elem.count,
        children_robots: parsedRobots.filter((rob) =>
          rob.tipo_robot.includes(elem.id),
        ),
      };
    });

    return parsedJson;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const robotTypesLoader = (queryClient: QueryClient) => async () => {
  const query = robotTypesQuery();

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};

export type QueryType = () => {
  queryKey: string[];
  queryFn: () => Promise<object>;
};

export type RobotTypesList = Array<RobotType>;

export interface RobotType {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  taxonomy: string;
  children_robots?: Robot[];
  acf:
    | {
        intro: string;
        immagine_robot: number;
        testo: string;
        file_csv: number;
        allegati: Allegato[];
      }
    | [];
}

export interface Robot {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_media: number;
  "tipo-robot": number[];
  acf: {
    intro: string;
    immagine_robot: number;
    testo: string;
    file_csv: number;
    allegati: Allegato[];
  };
}

export interface Allegato {
  didascalia: string;
  tipo: string;
  file: string;
  video_url: string;
}

export const useMediaAsset = (assetId?: number) => {
  return useQuery({
    queryKey: ["getAssets", assetId],
    queryFn: async () => {
      const data = await fetch(import.meta.env.VITE_ASSET_ENDPOINT);
      const json: Asset[] = await data.json();

      const parsedJson = json.map((asset) => {
        const { id, guid, title, media_type, link, ...rest } = asset;

        return { id, guid, title, media_type, link };
      });

      if (assetId) {
        const selectedAsset = parsedJson.find((one) => one.id == assetId);
        return selectedAsset;
      } else return parsedJson;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export interface Asset {
  id: number;
  guid: { rendered: string };
  title: { rendered: string };
  media_type: "file" | "image";
  link: string;
}

export const useCSVFile = (id?: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["FetchedCSV", id],
    queryFn: async () => {
      const data: Asset[] | undefined = queryClient.getQueryData([
        "getAssets",
        null,
      ]);

      if (data) {
        const tableElement = data.find((one) => one.id === id);

        if (tableElement?.guid.rendered) {
          const csvData = await fetch(tableElement?.guid.rendered);

          const csvText = await csvData.text();

          const resultArray: string[][] = [];

          csvText.split("\n").forEach(function (row) {
            const rowArray: string[] = [];
            row.split(",").forEach(function (cell) {
              rowArray.push(cell);
            });
            resultArray.push(rowArray);
          });

          return resultArray;
        }
      }

      // const data = await fetch(import.meta.env.VITE_ASSET_ENDPOINT + "/" + id);
      // const json = await data.json();

      // const csvData = await fetch(json.guid.rendered);

      // console.debug(csvData);
      // return json;
    },
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const campiApplicativiQuery: QueryType = () => ({
  queryKey: ["campiApplicativi"],
  queryFn: async () => {
    const data = await fetch(import.meta.env.VITE_CAMPI_APP_ENDPOINT);
    const json = await data.json();

    console.debug(json);

    return json;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const campiApplicativiLoader =
  (queryClient: QueryClient) => async () => {
    const query = campiApplicativiQuery();

    console.debug("ao");

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };
