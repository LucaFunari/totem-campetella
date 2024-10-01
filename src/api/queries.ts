import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { EstrusioneEntitaResp, EstrusioneTipoResp } from "./types";
import Papa from "papaparse";
import { queryClient } from "../main";
import { useLocalizationStore } from "../zustand-stores";

export const generalSettingsQuery = (lang_id?: "it" | "en") => ({
  queryKey: ["generalSettings", lang_id],
  queryFn: async () => {
    console.debug("downloading " + lang_id + " settings file");
    const data = await fetch(
      "https://campetella.wp.jef.it/index.php/wp-json/wp/v2/settings/impostazioni-app-" +
        lang_id,
    );

    const json = (await data.json()) as GeneralSetting;
    return json?.settings;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const generalSettingsLoader = (queryClient: QueryClient) => async () => {
  const { lang } = useLocalizationStore.getState();
  const query = generalSettingsQuery(lang);

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};

export const useString = (key?: string) => {
  const { lang } = useLocalizationStore();
  const { data } = useQuery(generalSettingsQuery(lang));
  if (data && key) {
    const string = data[key];

    if (string) {
      return string;
    } else return key;
  }
};

export const robotTypesQuery = (langID: "it" | "en") => ({
  queryKey: ["robotTypes", langID],
  queryFn: async () => {
    const data = await fetch(
      import.meta.env.VITE_ROBOT_TYPE_ENDPOINT +
        "?per_page=100" +
        "&lang=" +
        langID,
    );
    const json = await data.json();

    const robotList = await fetch(
      import.meta.env.VITE_ROBOT_LIST_ENDPOINT + "?per_page=100&lang=" + langID,
    );
    const robotListJson: Robot[] = await robotList.json();

    const parsedRobots = robotListJson.map((robot) => {
      const parentFamilies: RobotType[] = json.filter((families: RobotType) =>
        robot["tipo-robot"].includes(families.id),
      );

      const allegatiFam = parentFamilies.map((fam) => {
        return fam.acf?.allegato;
      });

      const mergedAllegati = [
        ...(robot.acf.allegato || []),
        ...allegatiFam.flat(),
      ];

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
        acf: elem.acf,
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
  const { lang } = useLocalizationStore.getState();

  const query = robotTypesQuery(lang);

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};

export const estrusioniQuery = (langID: "it" | "en") => ({
  queryKey: ["getEstrusioni", langID],
  queryFn: async () => {
    const estrusioneResp = await fetch(
      import.meta.env.VITE_ESTRUSIONI_TIPO_ENDPOINT +
        "?per_page=100&lang=" +
        langID,
    );

    const estrusioneTipi = (await estrusioneResp.json()) as EstrusioneTipoResp;

    const entitaResp = await fetch(
      import.meta.env.VITE_ESTRUSIONI_ENTITA_ENDPOINT +
        "?per_page=100&lang=" +
        langID,
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

    const data = await fetch(
      import.meta.env.VITE_ROBOT_TYPE_ENDPOINT +
        "?per_page=100" +
        "&lang=" +
        langID,
    );
    const json = await data.json();

    const robotList = await fetch(
      import.meta.env.VITE_ROBOT_LIST_ENDPOINT + "?per_page=100&lang=" + langID,
    );
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
        acf: elem.acf,
        name: elem.name,
        description: elem.description,
        slug: elem.slug,
        count: elem.count,
        children_robots: parsedRobots.filter((rob) =>
          rob.tipo_robot.includes(elem.id),
        ),
      };
    });

    const parsedGyreRobots = parsedJson.filter(
      (robotType: RobotType) => robotType.acf.sezione === "estrusione",
    );

    const response = parsedTipi.map((tipo) => {
      return {
        ...tipo,
        children: parsedEntita.filter((ones) =>
          ones.tipo_estrusione.includes(tipo.id),
        ),
      };
    });

    const extendedResp = { estrusioni: response, robot: parsedGyreRobots };

    return extendedResp;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const estrusioniLoader = (queryClient: QueryClient) => async () => {
  const { lang } = useLocalizationStore.getState();

  const query = estrusioniQuery(lang);

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
        immagine: number;
        testo: string;
        icona: number;
        file_csv: number;
        sezione: "estrusione" | "iniezione";
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
    ordine: number;
    intro: string;
    immagine_robot: number;
    testo: string;
    file_csv: number;
    allegato: Allegato[];
  };
}

export interface Allegato {
  didascalia: string;
  tipo: string;
  file: string;
  video_url: string;
}

export const useMediaAsset = () => {
  return useQuery({
    queryKey: ["getAssets"],
    queryFn: async () => {
      const data = await fetch(
        import.meta.env.VITE_ASSET_ENDPOINT + "?per_page=2000",
      );
      const json: Asset[] = await data.json();
      return json;
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

  const { data, error, isLoading } = useMediaAsset() as {
    data: Asset[];
    error: Error;
    isLoading: boolean;
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
  } else if (isLoading) {
    resp.isLoading = true;
    return resp;
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
  source_url: string;
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
        const tableElement = data?.find((one) => one.id === id);

        const csvUrl = tableElement?.source_url;

        if (csvUrl) {
          const csvData = await fetch(csvUrl);

          const csvText = await csvData.text();

          const { data } = Papa.parse(csvText);

          const resultArray: string[][] = [];

          csvText.split("\n").forEach(function (row) {
            const rowArray: string[] = [];
            row.split(";").forEach(function (cell) {
              rowArray.push(cell);
            });
            resultArray.push(rowArray);
          });

          return data;
        }
      }
    },
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const campiApplicativiQuery = (langID: "it" | "en") => ({
  queryKey: ["campiApplicativi", langID],
  queryFn: async () => {
    const data = await fetch(
      import.meta.env.VITE_CAMPI_APP_ENDPOINT + "?per_page=100&lang=" + langID,
    );
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
    const { lang } = useLocalizationStore();
    const query = campiApplicativiQuery(lang);

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

type GeneralSetting = {
  [key: string]: boolean | string | number;
  estrusione_lista_video: {
    "estrusione-video": number;
    immagine_anteprima_video: number;
  }[];
  linea_lista_video: {
    "estrusione-video": number;
    immagine_anteprima_video: number;
  }[];
};

export const getServiceQuery = (lang: "it" | "en") => ({
  queryKey: ["getService", lang],
  queryFn: async () => {
    const data = await fetch(
      "https://campetella.wp.jef.it/index.php/wp-json/wp/v2/service?lang=" +
        lang,
    );

    const json = await data.json();

    return json;
  },
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

export const serviceLoader = (queryClient: QueryClient) => async () => {
  const { lang } = useLocalizationStore.getState();
  const query = getServiceQuery(lang);

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};
