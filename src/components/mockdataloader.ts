import { QueryClient, useQuery } from "@tanstack/react-query";

export const mockDataQuery = () => ({
  queryKey: ["mockData"],
  queryFn: async () => {
    const data = await fetch("/json/mocksitedata.json").catch((er) => {
      throw er;
    });
    const jsonData = await data.json();
    return jsonData;
  },
  staleTime: Infinity,
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = mockDataQuery();

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};

export const mockDetailedQuery = (id: string) => ({
  queryKey: ["detailedQuery", id],
  queryFn: async () => {
    const data = await fetch("/json/" + id + ".json");
    const jsonData = await data.json();

    return jsonData;
  },
});

export const detailedPageLoader =
  (queryClient: QueryClient, id: string) => async () => {
    const query = mockDetailedQuery(id);

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };

export const videoQuery = (videoId?: number) => ({
  queryKey: ["VideoData", videoId],
  queryFn: async () => {
    const data = await mockAsyncFn();
    return data;
  },
  enabled: !!videoId,
});

const mockAsyncFn = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const rand = Math.ceil(Math.random() * 10000 + 90000);
      resolve(rand);
    }, 1e3);
  });
};

export const useTableData = (path?: string) => {
  return useQuery({
    queryKey: ["fetchTable", path],
    queryFn: async () => {
      const data = await fetch(path!);
      const text = await data.text();

      const resultArray: string[][] = [];

      text.split("\n").forEach(function (row) {
        const rowArray: string[] = [];
        row.split(",").forEach(function (cell) {
          rowArray.push(cell);
        });
        resultArray.push(rowArray);
      });

      console.debug(resultArray);
      return resultArray;
    },
    enabled: !!path,
    staleTime: Infinity,
  });
};
