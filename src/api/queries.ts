import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { EstrusioneEntitaResp, EstrusioneTipoResp } from "./types";

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
        description: elem.description,
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

export const estrusioniQuery: QueryType = () => ({
  queryKey: ["getEstrusioni"],
  queryFn: async () => {
    const estrusioneResp = await fetch(
      import.meta.env.VITE_ESTRUSIONI_TIPO_ENDPOINT,
    );

    const estrusioneTipi = (await estrusioneResp.json()) as EstrusioneTipoResp;

    const entitaResp = await fetch(
      import.meta.env.VITE_ESTRUSIONI_ENTITA_ENDPOINT,
    );

    const entitaEstrusione = (await entitaResp.json()) as EstrusioneEntitaResp;

    const parsedTipi = estrusioneTipi.map((tipo) => {
      const { id, name, count, acf, slug, meta, ...rest } = tipo;

      return { id, name, count, acf, slug, meta };
    });
    const parsedEntita = entitaEstrusione.map((entita) => {
      const { acf, content, id, guid, featured_media, slug, title, ...rest } =
        entita;

      const tipo_estrusione = entita["tipo-estrusione"];

      return {
        acf,
        content,
        title,
        id,
        guid,
        featured_media,
        slug,
        tipo_estrusione,
      };
    });

    const response = parsedTipi.map((tipo) => {
      return {
        ...tipo,
        children: parsedEntita.filter((ones) =>
          ones.tipo_estrusione.includes(tipo.id),
        ),
      };
    });

    return response;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const estrusioniLoader = (queryClient: QueryClient) => async () => {
  const query = estrusioniQuery();

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
        allegato: Allegato[];
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
    queryKey: ["getAssets"],
    queryFn: async () => {
      const data = await fetch(
        import.meta.env.VITE_ASSET_ENDPOINT + "?lang=" + "it",
      );
      const json: Asset[] = await data.json();

      const parsedJson = json.map((asset) => {
        const { id, guid, title, media_type, link, ...rest } = asset;

        return { id, guid, title, media_type, link };
      });
      if (assetId || assetId === 0) {
        const selectedAsset = parsedJson.find((one) => one.id == assetId);
        if (selectedAsset) {
          return selectedAsset;
        } else {
          const err = new Error("asset " + assetId + " is missing");
          throw err;
        }
      } else return parsedJson;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export function useSingleAsset(id?: number) {
  const resp: { asset?: Asset; error?: Error; isLoading: boolean } = {
    asset: undefined,
    error: undefined,
    isLoading: true,
  };

  const { data, error } = useMediaAsset() as {
    data: Asset[];
    error: Error;
  };
  if (data) {
    const singleAsset = data.find((one) => one.id == id);

    if (singleAsset) {
      resp.asset = singleAsset;
      resp.isLoading = false;
      return resp;
    } else {
      const err = new Error("Asset " + id + " is missing");
      resp.error = err;
      resp.isLoading = false;
      return resp;
    }
  } else if (error) {
    resp.error = error;
    resp.isLoading = false;
    return resp;
  } else {
    const err = new Error("missing media list data");
    resp.error = err;
    resp.isLoading = false;
    return resp;
  }
}

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
      const data: Asset[] | undefined = queryClient.getQueryData(["getAssets"]);

      if (data) {
        const tableElement = data.find((one) => one.id === id);

        const csvUrl = tableElement?.guid.rendered;

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

          return resultArray;
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

export const getFineLineaQuery: QueryType = () => ({
  queryKey: ["FineLineaData"],
  queryFn: async () => {
    const data = await fetch("/json/fine_linea.json");
    const json = await data.json();

    return json;
  },
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const fineLineaLoader = (queryClient: QueryClient) => async () => {
  const query = getFineLineaQuery();

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};
