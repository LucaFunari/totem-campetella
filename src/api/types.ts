import { RobotType } from "./queries";

export type EstrusioneEntitaResp = {
  id: number;
  "tipo-estrusione": number[];
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  featured_media: number;
  template: string;
  meta: { _acf_changed: boolean };
  class_list: string[];
  acf: {
    estrusione_entita_id: string;
    estrusione_entita_tipo: number;
    estrusione_entita_video: string;
  };
  _links: {
    self: [
      {
        href: string;
      },
    ];
    collection: [
      {
        href: string;
      },
    ];
    about: [
      {
        href: string;
      },
    ];
    "acf:term": [
      {
        embeddable: boolean;
        taxonomy: string;
        href: string;
      },
    ];
    "wp:attachment": [
      {
        href: string;
      },
    ];
    curies: [{ name: string; href: string; templated: boolean }];
  };
}[];

export type EstrusioneTipoResp = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: [];
  acf: [];
  _links: {
    self: [
      {
        href: string;
      },
    ];
    collection: [
      {
        href: string;
      },
    ];
    about: [
      {
        href: string;
      },
    ];
    "wp:post_type": [
      {
        href: string;
      },
    ];
    curies: [{ name: string; href: string; templated: boolean }];
  };
}[];

export type EstrusioniResp = {
  estrusioni: ParsedEstrusioni[];
  robot: RobotType[];
};

export type ParsedEstrusioni = {
  id: number;
  name: string;
  description: string;
  count: number;
  acf: {
    icona: number;
    immagine: number;
    sezione: "iniezione" | "estrusione" | "medical";
    testo: string;
  };
  slug: string;
  meta: [];
  children_robots: ParsedEntita[] | [];
};

export type ParsedEntita = {
  acf: {
    estrusione_entita_id: string;
    estrusione_entita_video: string;
    immagine: number;
  };
  title: { rendered: string };
  content: {
    rendered: string;
    protected: boolean;
  };
  id: string;
  guid: {
    rendered: string;
  };
  featured_media: number;
  slug: string;
  tipo_estrusione: number[];
};

export type serviceResp = {
  title: string;
};

export type IconResp = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  featured_media: number;
  template: string;
  meta: { _acf_changed: boolean };
  class_list: string[];
  acf: {
    ordine: number;
    nome: string;
    icona: number;
  };
  _links: Record<string, [{ href: string }]>;
};
