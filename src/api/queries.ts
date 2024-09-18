import { useQuery } from "@tanstack/react-query";

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

export const useRobotType = (id?: number) => {
  return useQuery({
    queryKey: ["robotType", id],

    queryFn: async () => {
      const data = await fetch(
        import.meta.env.VITE_ROBOT_TYPE_ENDPOINT + "/" + id,
      );

      const json = await data.json();

      return json;
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
