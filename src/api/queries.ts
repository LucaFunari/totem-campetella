import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../main";

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
      if (assetId || assetId === 0) {
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

        const csvUrl = tableElement?.guid.rendered || "asset/csv/mc2_table.csv";

        if (csvUrl) {
          const csvData = await fetch(csvUrl);

          const csvText = await csvData.text();

          const array = csvToArray(csvText);

          const resultArray: string[][] = [];

          csvText.split("\n").forEach(function (row) {
            const rowArray: string[] = [];
            row.split(",").forEach(function (cell) {
              rowArray.push(cell);
            });
            resultArray.push(rowArray);
          });

          return array;
        }
      }
    },
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const campiApplicativiQuery: QueryType = () => ({
  queryKey: ["campiApplicativi"],
  queryFn: async () => {
    const data = await fetch(import.meta.env.VITE_CAMPI_APP_ENDPOINT);
    const json = (await data.json()) as CampoApplicativo[];

    const parsedCamps = json.map((campo) => {
      const { id, slug, acf, content, featured_media, title, type } = campo;
      return {
        id,
        slug,
        acf,
        content,
        featured_media,
        title,
        type,
        name: title.rendered,
      };
    });

    return parsedCamps;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const campiApplicativiLoader =
  (queryClient: QueryClient) => async () => {
    const query = campiApplicativiQuery();

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };

export type CampoApplicativo = {
  id: number;
  guid: {
    rendered: string;
  };
  slug: string;
  type: "campo-applicativo";
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;

  acf: {
    icona: string;
    testo: string;
    allegati: {
      "allegato-immagine": number;
      "allegato-video": number;
      "allegato-file": string;
      "allegato-didascalia": string;
    }[];
  };
};

function csvToArray(text: string, quoteChar = '"', delimiter = ",") {
  const rows = text.split("\n");
  const headers = rows[0].split(",");

  const regex = new RegExp(
    `\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`,
    "gs",
  );

  const match = (line: string) =>
    [...line.matchAll(regex)].map((m) => m[2]).slice(0, -1);

  let lines = text.split("\n");
  const heads = headers ?? match(lines.shift());
  lines = lines.slice(1);

  const prov = lines.map((line) => {
    return match(line).reduce((acc, cur, i) => {
      // replace blank matches with `null`
      const val = cur.length <= 0 ? null : Number(cur) || cur;
      const key = heads[i] ?? `{i}`;
      return { ...acc, [key]: val };
    }, {});
  });

  const prov2 = lines.map((line) => {
    const cells: string[] = [];

    line.split(",").map((cell) => {
      cells.push(cell);
    });

    return cells;
  });

  return prov2;

  // return lines.map((line) => {
  //   return match(line).reduce((acc, cur, i) => {
  //     // replace blank matches with `null`
  //     const val = cur.length <= 0 ? null : Number(cur) || cur;
  //     const key = heads[i] ?? `{i}`;
  //     return { ...acc, [key]: val };
  //   }, {});
  // });
}
