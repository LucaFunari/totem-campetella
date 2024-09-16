import { QueryClient } from "@tanstack/react-query";

export const mockDataQuery = () => ({
  queryKey: ["mockData"],
  queryFn: async () => {
    const data = await fetch("/json/mocksitedata.json");
    const jsonData = await data.json();
    return jsonData;
  },
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
    console.debug("porovazz");
    const query = mockDetailedQuery(id);

    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };
