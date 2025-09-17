import { useQuery } from "@tanstack/react-query";
import { Robot, RobotType } from "./queries";
import { EstrusionepoResp, IconResp } from "./types";

interface MedicalResponse {
  title: string;
  description: string;
  robots: RobotType[];
  icons: IconResp[];
}

interface ParsedMedicalResponse extends Omit<MedicalResponse, "icons"> {
  icons: { title: string; iconId: number }[];
}

export const useMedicalExecution = (langID: "it" | "en") => {
  return useQuery({
    queryKey: ["medicalExecution", langID],
    queryFn: async () => {
      const data = await fetch("./json/mockmedical.json");

      const resp = (await data.json()) as MedicalResponse;

      const icons = resp.icons.map(({ acf }) => {
        return { title: acf.nome, iconId: acf.icona };
      });

      return { ...resp, icons: icons } as ParsedMedicalResponse;
    },

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
